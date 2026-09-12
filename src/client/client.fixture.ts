import type {
  Brand,
  District,
  Fuel,
  Municipality,
  Station,
  StationFuel,
  StationType,
} from './client.type';

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
