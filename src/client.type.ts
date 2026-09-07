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

export interface StationFuel {
  name: string;
  price: string;
  updatedAt: string;
}

export interface Station {
  id: number;
  name: string;
  brand: string;
  district: string;
  municipality: string;
  address: string;
  town: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  fuels: StationFuel[];
}

export interface StationFilters {
  districtId?: number;
  municipalityIds?: number[];
  brandId?: number;
  fuelTypeIds?: number[];
  stationTypeId?: number;
}

export interface DGEGResponse<T> {
  resultado: T;
  sucesso: boolean;
  mensagem: string | null;
}
