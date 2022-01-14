export enum TipoAbaEnum {
  Vue = 1,
  Iframe = 2,
}
export interface IAbaPrincipalModel {
  nome: string;
  id: number;
  url: string;
  tipo: TipoAbaEnum;
}

export type IAbaPrincipalinputModel = Omit<IAbaPrincipalModel, "id">;
