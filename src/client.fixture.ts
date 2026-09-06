import type {
  Brand,
  DGEGBrand,
  DGEGDistrict,
  DGEGFuel,
  DGEGMunicipality,
  District,
  Fuel,
  Municipality,
} from './client.type';

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
