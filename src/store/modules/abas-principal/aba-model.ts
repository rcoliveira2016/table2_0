export enum TipoAbaEnum {
  Vue = 1,
  Iframe = 2,
}
export type IAbaPrincipalModel =
  | IAbaPrincipalIframeModel
  | IAbaPrincipalVueModel;

export interface IAbaPrincipalIframeModel {
  nome: string;
  id: number;
  url: string;
  tipo: TipoAbaEnum.Iframe;
}

export interface IAbaPrincipalVueModel {
  nome: string;
  id: number;
  nameRoute: string;
  tipo: TipoAbaEnum.Vue;
  resetStore: string | (() => void);
}

export type IAbaPrincipalinputModel =
  | Omit<IAbaPrincipalIframeModel, "id">
  | Omit<IAbaPrincipalVueModel, "id">;
