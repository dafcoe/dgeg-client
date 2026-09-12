import type {
  DGEGBrand,
  DGEGDistrict,
  DGEGFuel,
  DGEGMunicipality,
  DGEGStationFuel,
  DGEGStationType,
} from '../../http-client';
import type {
  Brand,
  District,
  Fuel,
  Municipality,
  Station,
  StationFuel,
  StationType,
} from '../client.type';

// ###############################################################
// Districts
// ###############################################################

export const districtLisboaFixture: District = {
  id: 1,
  name: 'Lisboa',
};

export const districtFaroFixture: District = {
  id: 2,
  name: 'Faro',
};

export const districtsFixture: District[] = [
  districtLisboaFixture,
  districtFaroFixture,
];

export const dgegDistrictLisboaFixture: DGEGDistrict = {
  Id: 1,
  Descritivo: 'Lisboa',
};

export const dgegDistrictFaroFixture: DGEGDistrict = {
  Id: 2,
  Descritivo: 'Faro',
};

export const dgegDistrictsFixture: DGEGDistrict[] = [
  dgegDistrictLisboaFixture,
  dgegDistrictFaroFixture,
];

// ###############################################################
// Municipalities
// ###############################################################

export const municipalityLisboaFixture: Municipality = {
  id: 1,
  idDistrict: 1,
  name: 'Lisboa',
};

export const municipalitySintraFixture: Municipality = {
  id: 2,
  idDistrict: 1,
  name: 'Sintra',
};

export const municipalitiesFixture: Municipality[] = [
  municipalityLisboaFixture,
  municipalitySintraFixture,
];

export const dgegMunicipalityLisboaFixture: DGEGMunicipality = {
  Id: 1,
  Descritivo: 'Lisboa',
  IdDistrito: 1,
  Distrito: dgegDistrictLisboaFixture,
};

export const dgegMunicipalitySintraFixture: DGEGMunicipality = {
  Id: 2,
  Descritivo: 'Sintra',
  IdDistrito: 1,
  Distrito: dgegDistrictLisboaFixture,
};

export const dgegMunicipalitiesFixture: DGEGMunicipality[] = [
  dgegMunicipalityLisboaFixture,
  dgegMunicipalitySintraFixture,
];

// ###############################################################
// Brands
// ###############################################################

export const brandAFixture: Brand = {
  id: 1,
  name: 'Marca A',
};

export const brandBFixture: Brand = {
  id: 2,
  name: 'Marca B',
};

export const brandsFixture: Brand[] = [
  brandAFixture,
  brandBFixture,
];

export const dgegBrandAFixture: DGEGBrand = {
  Id: 1,
  Descritivo: 'Marca A',
};

export const dgegBrandBFixture: DGEGBrand = {
  Id: 2,
  Descritivo: 'Marca B',
};

export const dgegBrandsFixture: DGEGBrand[] = [
  dgegBrandAFixture,
  dgegBrandBFixture,
];

// ###############################################################
// Station Types
// ###############################################################

export const stationTypeHighwayFixture: StationType = {
  id: 1,
  name: 'Autoestrada',
};

export const stationTypeOtherFixture: StationType = {
  id: 2,
  name: 'Outro',
};

export const stationTypeFixtures: StationType[] = [
  stationTypeHighwayFixture,
  stationTypeOtherFixture,
];

export const dgegStationTypeHighwayFixture: DGEGStationType = {
  Id: 1,
  Descritivo: 'Autoestrada',
};

export const dgegStationTypeOtherFixture: DGEGStationType = {
  Id: 2,
  Descritivo: 'Outro',
};

export const dgegStationTypeFixtures: DGEGStationType[] = [
  dgegStationTypeHighwayFixture,
  dgegStationTypeOtherFixture,
];

// ###############################################################
// Fuels
// ###############################################################

export const fuelPetrolFixture: Fuel = {
  id: 1,
  name: 'Gasolina',
  measurementUnit: 'litro',
};

export const fuelGasFixture: Fuel = {
  id: 2,
  name: 'Gás Natural Comprimido',
  measurementUnit: 'm3',
};

export const fuelsFixture: Fuel[] = [
  fuelPetrolFixture,
  fuelGasFixture,
];

export const dgegFuelPetrolFixture: DGEGFuel = {
  Id: 1,
  Descritivo: 'Gasolina',
  UnidadeMedida: 'litro',
  BackGroundColor: null,
  fl_ViewWebSite: true,
  fl_ativo: true,
  fl_rodoviario: true,
};

export const dgegFuelGasFixture: DGEGFuel = {
  Id: 2,
  Descritivo: 'Gás Natural Comprimido',
  UnidadeMedida: 'm3',
  BackGroundColor: null,
  fl_ViewWebSite: true,
  fl_ativo: true,
  fl_rodoviario: true,
};

export const dgegFuelsFixture: DGEGFuel[] = [
  dgegFuelPetrolFixture,
  dgegFuelGasFixture,
];

// ###############################################################
// Stations
// ###############################################################

export const stationFuelPetrolFixture: StationFuel = {
  id: 1,
  name: 'Gasolina',
  price: '2,140 €',
  measurementUnit: 'litro',
  updatedAt: '2026-08-31 15:40',
};

export const stationFuelGasFixture: StationFuel = {
  id: 2,
  name: 'Gás Natural Comprimido',
  price: '1,140 €',
  measurementUnit: 'm3',
  updatedAt: '2026-08-31 15:41',
};

export const stationAFixture: Station = {
  id: 1,
  name: 'Estação A',
  brand: 'Marca A',
  district: 'Lisboa',
  municipality: 'Lisboa',
  address: 'Parque das Nações',
  town: 'Lisboa',
  postalCode: '1000-000',
  latitude: 41.2637,
  longitude: -8.3679,
  fuels: [
    stationFuelPetrolFixture,
    stationFuelGasFixture,
  ],
};

export const stationsFixture: Station[] = [
  stationAFixture,
];

export const dgegStationFuelPetrolFixture: DGEGStationFuel = {
  Id: 1,
  Nome: 'Estação A',
  TipoPosto: 'Outro',
  Municipio: 'Lisboa',
  Preco: '2,140 €',
  Marca: 'Marca A',
  Combustivel: 'Gasolina',
  DataAtualizacao: '2026-08-31 15:40',
  Distrito: 'Lisboa',
  Morada: 'Parque das Nações',
  Localidade: 'Lisboa',
  CodPostal: '1000-000',
  Latitude: 41.2637,
  Longitude: -8.3679,
};

export const dgegStationFuelGasFixture: DGEGStationFuel = {
  Id: 1,
  Nome: 'Estação A',
  TipoPosto: 'Outro',
  Municipio: 'Lisboa',
  Preco: '1,140 €',
  Marca: 'Marca A',
  Combustivel: 'Gás Natural Comprimido',
  DataAtualizacao: '2026-08-31 15:41',
  Distrito: 'Lisboa',
  Morada: 'Parque das Nações',
  Localidade: 'Lisboa',
  CodPostal: '1000-000',
  Latitude: 41.2637,
  Longitude: -8.3679,
};

export const dgegStationFuelsFixture: DGEGStationFuel[] = [
  dgegStationFuelPetrolFixture,
  dgegStationFuelGasFixture,
];
