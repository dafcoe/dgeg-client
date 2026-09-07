import {
  Brand,
  DGEGBrand,
  DGEGDistrict,
  DGEGFuel,
  DGEGMunicipality, type DGEGStationFuel,
  District,
  Fuel,
  Municipality, Station, StationFuel,
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

export function mapDGEGStationFuelToStationFuel(dgegStationFuel: DGEGStationFuel): StationFuel {
  return {
    name: dgegStationFuel.Combustivel,
    price: dgegStationFuel.Preco,
    updatedAt: dgegStationFuel.DataAtualizacao,
  };
}

export function mapDGEGStationFuelToStationWithoutFuels(dgegStationFuel: DGEGStationFuel): Station {
  return {
    id: dgegStationFuel.Id,
    name: dgegStationFuel.Nome,
    brand: dgegStationFuel.Marca,
    district: dgegStationFuel.Distrito,
    municipality: dgegStationFuel.Municipio,
    address: dgegStationFuel.Morada,
    town: dgegStationFuel.Localidade,
    postalCode: dgegStationFuel.CodPostal,
    latitude: dgegStationFuel.Latitude,
    longitude: dgegStationFuel.Longitude,
    fuels: [],
  };
}

export function mapDGEGStationFuelsToStations(dgegStationFuels: DGEGStationFuel[]): Station[] {
  const stations = new Map<number, Station>();

  dgegStationFuels.forEach((dgegStationFuel) => {
    const stationFuel = mapDGEGStationFuelToStationFuel(dgegStationFuel);
    let station = stations.get(dgegStationFuel.Id);

    if (!station) {
      station = mapDGEGStationFuelToStationWithoutFuels(dgegStationFuel);
      stations.set(dgegStationFuel.Id, station);
    }

    station.fuels.push(stationFuel);
  });

  return Array.from(stations.values());
}
