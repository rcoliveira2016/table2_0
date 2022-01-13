export interface IAbaPrincipalModel {
  nome: string;
  id: number;
  url: string;
}

export type IAbaPrincipalinputModel = Omit<IAbaPrincipalModel, "id">;
