import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "@/store";
import {
  IAbaPrincipalinputModel,
  IAbaPrincipalModel,
  IAbaPrincipalVueModel,
  TipoAbaEnum,
} from "./aba-model";
type bool = { heVerdadeiro: boolean };
@Module({
  namespaced: true,
  name: "AbasPrincipalStoreModule",
  store: store,
  dynamic: true,
})
class AbasPrincipalStoreModule extends VuexModule {
  idAbaSequencial = 0;
  abas: IAbaPrincipalModel[] = [];
  idAbaAtual = this.idAbaSequencial;

  get abaSelecionadaAtual(): IAbaPrincipalModel | undefined {
    return this.abas.find((x) => x.id == this.idAbaAtual);
  }
  get abaSelecionadaAtualHeVue(): boolean {
    const aba = this.abas.find((x) => x.id == this.idAbaAtual);
    if (!aba) return false;
    return aba.tipo == TipoAbaEnum.Vue;
  }

  @Mutation
  adicionarAbas(abas: IAbaPrincipalModel[]): void {
    this.abas = abas;
  }

  @Mutation
  acresentarIdAbaSequencial(): void {
    this.idAbaSequencial += 1;
  }

  @Mutation
  setarAba(id: number): void {
    this.idAbaAtual = id;
  }

  @Mutation
  setarAbaPorIndex(index: number): void {
    const id = this.abas[index].id;
    if (!id) return;
    this.idAbaAtual = id;
  }

  @Action
  async adicionarAba(aba: IAbaPrincipalinputModel): Promise<void> {
    const valor = await this.verificarRegraDiconarAba(aba);
    if (!valor) return;

    const novaAba = await this.adicionarAbaInterna(aba);
    console.log(novaAba);
    this.setarAba(novaAba.id);
  }

  @Action
  removerAba(id: number): void {
    const index = this.abas.findIndex((x) => x.id == id);
    this.abaVueRepitida(this.abas[index]);
    this.abas.splice(index, 1);

    if (id != this.idAbaAtual) return;
    const novoIndex = index == 0 ? index : index - 1;
    if (novoIndex < 0 || novoIndex > this.abas.length || this.abas.length < 1)
      return;

    const proximaAba = this.abas[novoIndex];
    if (proximaAba) {
      this.setarAba(proximaAba.id);
    }
  }

  @Action
  async verificarRegraDiconarAba(
    aba: IAbaPrincipalinputModel
  ): Promise<boolean> {
    if (aba.tipo != TipoAbaEnum.Vue) return true;
    const ab = await this.abaVueRepitida(aba);
    console.log(ab);
    return ab;
  }

  @Action
  async abaVueRepitida(aba: IAbaPrincipalinputModel): Promise<boolean> {
    const abaNova = this.abas.find(
      (x) =>
        x.tipo == TipoAbaEnum.Vue &&
        x.nameRoute == (aba as IAbaPrincipalVueModel).nameRoute
    ) as IAbaPrincipalVueModel;
    if (!abaNova) return true;

    if (abaNova) {
      if (typeof abaNova.resetStore == "function") abaNova.resetStore();
      else if (store.hasModule(abaNova.resetStore))
        store.commit(abaNova.resetStore);

      this.setarAba(abaNova.id);
      return false;
    }

    return true;
  }

  @Action
  private async adicionarAbaInterna(
    aba: IAbaPrincipalinputModel
  ): Promise<IAbaPrincipalModel> {
    this.acresentarIdAbaSequencial();
    const novaAba: IAbaPrincipalModel = {
      ...aba,
      id: this.idAbaSequencial,
    };
    this.abas.push(novaAba);
    return novaAba;
  }
}

export const AbasPrincipalModule = getModule(AbasPrincipalStoreModule);

type AdicionarAbaFunction = (nome: string, id: number, url: string) => void;
declare global {
  interface Window {
    AdicionarAba: AdicionarAbaFunction;
  }
}

window.AdicionarAba = function (nome: string, id: number, url: string) {
  AbasPrincipalModule.adicionarAba({
    nome: nome,
    url: url,
    tipo: TipoAbaEnum.Iframe,
  });
};
