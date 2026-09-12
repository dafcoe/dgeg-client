import { DGEGMunicipalityFilters, DGEGStationFuelFilters } from '../../http-client';
import {
  mapDGEGBrandToBrand,
  mapDGEGBrandsToBrands,
  mapDGEGDistrictsToDistricts,
  mapDGEGDistrictToDistrict,
  mapDGEGFuelsToFuels,
  mapDGEGFuelToFuel,
  mapDGEGMunicipalitiesToMunicipalities,
  mapDGEGMunicipalityToMunicipality,
  mapDGEGStationFuelsToStations,
  mapDGEGStationFuelToStationFuel,
  mapDGEGStationFuelToStationWithoutFuels,
  mapDGEGStationTypesToStationTypes,
  mapDGEGStationTypeToStationType,
  mapMunicipalityFiltersToDGEGMunicipalityFilters,
  mapStationFiltersToDGEGStationFilters,
} from '../client.mapper';
import {
  Fuel,
  MunicipalityFilters,
  Station,
  StationFilters,
  StationFuel,
} from '../client.type';
import {
  brandAFixture,
  brandsFixture,
  districtLisboaFixture,
  districtsFixture,
  fuelPetrolFixture,
  fuelsFixture,
  municipalitiesFixture,
  municipalityLisboaFixture,
  stationFuelPetrolFixture,
  stationsFixture,
  stationTypeHighwayFixture,
  stationTypeFixtures,
  dgegBrandAFixture,
  dgegBrandsFixture,
  dgegDistrictLisboaFixture,
  dgegDistrictsFixture,
  dgegFuelPetrolFixture,
  dgegFuelsFixture,
  dgegMunicipalitiesFixture,
  dgegMunicipalityLisboaFixture,
  dgegStationFuelPetrolFixture,
  dgegStationFuelsFixture,
  dgegStationTypeHighwayFixture,
  dgegStationTypeFixtures,
  stationAFixture,
} from './client.fixture';

describe('client.mapper', () => {
  describe('districts', () => {
    it('should correctly map a single DGEGDistrict to District', () => {
      // Act
      const district = mapDGEGDistrictToDistrict(dgegDistrictLisboaFixture);

      // Assert
      expect(district).toEqual(districtLisboaFixture);
    });

    it('should correctly map an array of DGEGDistricts to Districts', () => {
      // Act
      const districts = mapDGEGDistrictsToDistricts(dgegDistrictsFixture);

      // Assert
      expect(districts).toEqual(districtsFixture);
    });

    it('should return an empty array when mapping an empty array of districts', () => {
      // Act
      const districts = mapDGEGDistrictsToDistricts([]);

      // Assert
      expect(districts).toEqual([]);
    });
  });

  describe('municipalities', () => {
    it('should correctly map a single DGEGMunicipality to Municipality', () => {
      // Act
      const municipality = mapDGEGMunicipalityToMunicipality(dgegMunicipalityLisboaFixture);

      // Assert
      expect(municipality).toEqual(municipalityLisboaFixture);
    });

    it('should correctly map an array of DGEGMunicipalities to Municipalities', () => {
      // Act
      const municipalities = mapDGEGMunicipalitiesToMunicipalities(dgegMunicipalitiesFixture);

      // Assert
      expect(municipalities).toEqual(municipalitiesFixture);
    });

    it('should return an empty array when mapping an empty array of municipalities', () => {
      // Act
      const municipalities = mapDGEGMunicipalitiesToMunicipalities([]);

      // Assert
      expect(municipalities).toEqual([]);
    });
  });

  describe('brands', () => {
    it('should correctly map a single DGEGBrand to Brand', () => {
      // Act
      const brand = mapDGEGBrandToBrand(dgegBrandAFixture);

      // Assert
      expect(brand).toEqual(brandAFixture);
    });

    it('should correctly map an array of DGEGBrands to Brands', () => {
      // Act
      const brands = mapDGEGBrandsToBrands(dgegBrandsFixture);

      // Assert
      expect(brands).toEqual(brandsFixture);
    });

    it('should return an empty array when mapping an empty array of brands', () => {
      // Act
      const brands = mapDGEGBrandsToBrands([]);

      // Assert
      expect(brands).toEqual([]);
    });
  });

  describe('station types', () => {
    it('should correctly map a single DGEGStationType to StationType', () => {
      // Act
      const stationType = mapDGEGStationTypeToStationType(dgegStationTypeHighwayFixture);

      // Assert
      expect(stationType).toEqual(stationTypeHighwayFixture);
    });

    it('should correctly map an array of DGEGStationTypes to StationTypes', () => {
      // Act
      const stationTypes = mapDGEGStationTypesToStationTypes(dgegStationTypeFixtures);

      // Assert
      expect(stationTypes).toEqual(stationTypeFixtures);
    });

    it('should return an empty array when mapping an empty array of station types', () => {
      // Act
      const stationTypes = mapDGEGStationTypesToStationTypes([]);

      // Assert
      expect(stationTypes).toEqual([]);
    });
  });

  describe('fuels', () => {
    it('should correctly map a single DGEGFuel to Fuel', () => {
      // Act
      const fuel = mapDGEGFuelToFuel(dgegFuelPetrolFixture);

      // Assert
      expect(fuel).toEqual(fuelPetrolFixture);
    });

    it('should correctly map an array of DGEGFuels to Fuels', () => {
      // Act
      const fuels = mapDGEGFuelsToFuels(dgegFuelsFixture);

      // Assert
      expect(fuels).toEqual(fuelsFixture);
    });

    it('should return an empty array when mapping an empty array of fuels', () => {
      // Act
      const fuels = mapDGEGFuelsToFuels([]);

      // Assert
      expect(fuels).toEqual([]);
    });
  });

  describe('station fuels', () => {
    it('should correctly map DGEGStationFuel to StationFuel when fuel is in fuelMap', () => {
      // Assemble
      const fuelMap = new Map<string, Fuel>([
        ['gasolina', fuelPetrolFixture],
      ]);

      // Act
      const stationFuel = mapDGEGStationFuelToStationFuel(dgegStationFuelPetrolFixture, fuelMap);

      // Assert
      expect(stationFuel).toEqual(stationFuelPetrolFixture);
    });

    it('should fallback to default values when fuel is not found in fuelMap', () => {
      // Assemble
      const expectedStationFuel: StationFuel = {
        id: -1,
        name: dgegStationFuelPetrolFixture.Combustivel,
        price: dgegStationFuelPetrolFixture.Preco,
        measurementUnit: '',
        updatedAt: dgegStationFuelPetrolFixture.DataAtualizacao,
      };

      // Act
      const stationFuel = mapDGEGStationFuelToStationFuel(dgegStationFuelPetrolFixture, new Map());

      // Assert
      expect(stationFuel).toEqual(expectedStationFuel);
    });

    it('should correctly map DGEGStationFuel to Station without fuels', () => {
      // Assemble
      const expectedStationFuel: Station = {
        ...stationAFixture,
        fuels: [],
      };

      // Act
      const station = mapDGEGStationFuelToStationWithoutFuels(dgegStationFuelPetrolFixture);

      // Assert
      expect(station).toEqual(expectedStationFuel);
    });

    it('should group multiple station fuels for the same station into a single station with fuels array', () => {
      // Act
      const stations = mapDGEGStationFuelsToStations(dgegStationFuelsFixture, fuelsFixture);

      // Assert
      expect(stations).toEqual(stationsFixture);
    });

    it('should return an empty array when mapping empty station fuels', () => {
      // Act
      const stations = mapDGEGStationFuelsToStations([]);

      // Assert
      expect(stations).toEqual([]);
    });
  });

  describe('filters', () => {
    describe('mapMunicipalityFiltersToDGEGMunicipalityFilters', () => {
      it('should map districtId filter when provided', () => {
        // Assemble
        const districtId = 1;
        const filters: MunicipalityFilters = { districtId };
        const expectedFilters: DGEGMunicipalityFilters = { idDistrito: districtId };

        // Act
        const municipalityFilters = mapMunicipalityFiltersToDGEGMunicipalityFilters(filters);

        // Assert
        expect(municipalityFilters).toEqual(expectedFilters);
      });

      it('should return an empty object when districtId is not provided', () => {
        // Act
        const filters = mapMunicipalityFiltersToDGEGMunicipalityFilters({});

        // Assert
        expect(filters).toEqual({});
      });
    });

    describe('mapStationFiltersToDGEGStationFilters', () => {
      it('should map all station filters when provided', () => {
        // Assemble
        const districtId = 1;
        const municipalityIds = [1, 2];
        const brandId = 3;
        const fuelTypeIds = [4, 5];
        const stationTypeId = 6;

        const filters: StationFilters = {
          districtId,
          municipalityIds,
          brandId,
          fuelTypeIds,
          stationTypeId,
        };

        const expectedDGEGFilters: DGEGStationFuelFilters = {
          idDistrito: districtId,
          idsMunicipios: municipalityIds,
          idMarca: brandId,
          idsTiposComb: fuelTypeIds,
          idTipoPosto: stationTypeId,
        };

        // Act
        const stationFilters = mapStationFiltersToDGEGStationFilters(filters);

        // Assert
        expect(stationFilters).toEqual(expectedDGEGFilters);
      });

      it('should return an empty object when no filters are provided', () => {
        // Act
        const stationFilters = mapStationFiltersToDGEGStationFilters({});

        // Assert
        expect(stationFilters).toEqual({});
      });
    });
  });
});
