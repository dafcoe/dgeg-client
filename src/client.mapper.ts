import { DGEGDistrict, District } from './client.type';

export function mapDGEGDistrictToDistrict(dgegDistrict: DGEGDistrict): District {
  return {
    id: dgegDistrict.Id,
    name: dgegDistrict.Descritivo,
  };
}

export function mapDGEGDistrictsToDistricts(dgegDistricts: DGEGDistrict[]): District[] {
  return dgegDistricts.map(mapDGEGDistrictToDistrict);
}
