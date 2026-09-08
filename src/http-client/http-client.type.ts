export interface DGEGDistrict {
  Id: number;
  Descritivo: string;
}

export interface DGEGMunicipalityFilters {
  idDistrito?: number;
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

export interface DGEGStationType {
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

export interface DGEGStationFuelFilters {
  idDistrito?: number;
  idsMunicipios?: number[];
  idMarca?: number;
  idsTiposComb?: number[];
  idTipoPosto?: number;
  qtdPorPagina?: number;
  pagina?: number;
}

export interface DGEGStationFuel {
  Id: number;
  Nome: string;
  TipoPosto: string;
  Municipio: string;
  Preco: string;
  Marca: string;
  Combustivel: string;
  DataAtualizacao: string;
  Distrito: string;
  Morada: string;
  Localidade: string;
  CodPostal: string;
  Latitude: number;
  Longitude: number;
  Quantidade?: number;
}

export interface DGEGResponse<T> {
  resultado: T;
  sucesso: boolean;
  mensagem: string | null;
}
