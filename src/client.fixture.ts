import type { DGEGDistrict, District } from './client.type';

export const dgegDistrictAveiroFixture: DGEGDistrict = {
  Id: 1,
  Descricao: 'Aveiro',
};

export const dgegDistrictFaroFixture: DGEGDistrict = {
  Id: 2,
  Descricao: 'Faro',
};

export const dgegDistrictsFixture: DGEGDistrict[] = [
  dgegDistrictAveiroFixture,
  dgegDistrictFaroFixture,
];

export const districtAveiroFixture: District = {
  id: 1,
  name: 'Aveiro',
};

export const districtFaroFixture: District = {
  id: 2,
  name: 'Faro',
};

export const districtsFixture: District[] = [
  districtAveiroFixture,
  districtFaroFixture,
];
