export interface DGEGDistrict {
  Id: number;
  Descritivo: string;
}

export interface DGEGMunicipality {
  Id: number;
  Descritivo: string;
  IdDistrito: number;
  Distrito: DGEGDistrict;
}

export interface DGEGBrand {
  Id: number;
  Descritivo: string;
}

export interface DGEGFuel {
  Id: number;
  Descritivo: string;
  UnidadeMedida: string;
  fl_ViewWebSite: boolean;
  fl_rodoviario: boolean;
  fl_ativo: boolean;
  BackGroundColor: string | null;
}

export interface District {
  id: number;
  name: string;
}

export interface Municipality {
  id: number;
  idDistrict: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Fuel {
  id: number;
  name: string;
  measurementUnit: string;
}

export interface DGEGResponse<T> {
  resultado: T;
  sucesso: boolean;
  mensagem: string | null;
}
