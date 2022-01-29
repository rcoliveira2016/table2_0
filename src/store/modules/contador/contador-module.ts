import {
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "@/store";

interface AbaStateModule {
  reset(): void;
}
@Module({
  namespaced: true,
  name: "ContadorStoreModule",
  store: store,
  dynamic: true,
})
class ContadorStoreModule extends VuexModule implements AbaStateModule {
  valor!: number;
  constructor(module: any) {
    super(module);
    this.reset();
  }
  @Mutation
  alterarValor(valor: number): void {
    this.valor = valor;
  }
  @Mutation
  reset(): void {
    this.valor = 10;
  }
}

export const ContadorModule = getModule(ContadorStoreModule);
