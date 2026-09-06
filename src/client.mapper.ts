import {
  Brand,
  DGEGBrand,
  DGEGDistrict,
  DGEGFuel,
  DGEGMunicipality,
  District,
  Fuel,
  Municipality,
} from './client.type';

export function mapDGEGDistrictToDistrict(dgegDistrict: DGEGDistrict): District {
  return {
    id: dgegDistrict.Id,
    name: dgegDistrict.Descritivo,
  };
}

export function mapDGEGDistrictsToDistricts(dgegDistricts: DGEGDistrict[]): District[] {
  return dgegDistricts.map(mapDGEGDistrictToDistrict);
}

export function mapDGEGMunicipalityToMunicipality(dgegMunicipality: DGEGMunicipality): Municipality {
  return {
    id: dgegMunicipality.Id,
    idDistrict: dgegMunicipality.IdDistrito,
    name: dgegMunicipality.Descritivo,
  };
}

export function mapDGEGMunicipalitiesToMunicipalities(dgegMunicipalities: DGEGMunicipality[]): Municipality[] {
  return dgegMunicipalities.map(mapDGEGMunicipalityToMunicipality);
}

export function mapDGEGBrandToBrand(dgegBrand: DGEGBrand): Brand {
  return {
    id: dgegBrand.Id,
    name: dgegBrand.Descritivo,
  };
}

export function mapDGEGBrandsToBrands(dgegBrands: DGEGBrand[]): Brand[] {
  return dgegBrands.map(mapDGEGBrandToBrand);
}

export function mapDGEGFuelToFuel(dgegFuel: DGEGFuel): Fuel {
  return {
    id: dgegFuel.Id,
    name: dgegFuel.Descritivo,
    measurementUnit: dgegFuel.UnidadeMedida,
  };
}

export function mapDGEGFuelsToFuels(dgegFuels: DGEGFuel[]): Fuel[] {
  return dgegFuels.map(mapDGEGFuelToFuel);
}
