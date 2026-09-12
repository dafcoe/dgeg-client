import type {
  DGEGBrand,
  DGEGDistrict,
  DGEGFuel,
  DGEGMunicipality,
  DGEGStationFuel,
  DGEGStationType,
} from '../http-client.type';

// ###############################################################
// Districts
// ###############################################################

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
