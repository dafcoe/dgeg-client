export interface District {
  id: number;
  name: string;
}

export interface MunicipalityFilters {
  districtId?: number;
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

export interface StationType {
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
