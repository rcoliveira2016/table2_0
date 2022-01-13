import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "@/store";
import { IAbaPrincipalinputModel, IAbaPrincipalModel } from "./aba-model";

@Module({
  namespaced: true,
  name: "menuBar",
  store: store,
  dynamic: true,
})
class AbasPrincipalStoreModule extends VuexModule {
  idAbaSequencial = 1;

  abas: IAbaPrincipalModel[] = [
    {
      id: this.idAbaSequencial,
      nome: "aba 1",
      url: "iframes/iframe-teste.html?id=1",
    },
  ];
  idAbaAtual = this.idAbaSequencial;

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
    console.log(id);
    this.idAbaAtual = id;
  }

  @Action
  adicionarAba(aba: IAbaPrincipalinputModel): void {
    this.acresentarIdAbaSequencial();
    const novaAba: IAbaPrincipalModel = {
      ...aba,
      id: this.idAbaSequencial,
    };
    this.abas.push(novaAba);
  }

  @Action
  removerAba(id: number): void {
    const index = this.abas.findIndex((x) => x.id == id);
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
  });
};
