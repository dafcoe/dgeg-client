import { Mocked, MockInstance } from 'vitest';
import {
  dgegBrandAFixture,
  dgegBrandsFixture,
  dgegDistrictLisboaFixture,
  dgegDistrictsFixture,
  dgegFuelGasFixture,
  dgegFuelPetrolFixture,
  dgegFuelsFixture,
  DGEGHttpClient,
  dgegMunicipalitiesFixture,
  DGEGMunicipalityFilters,
  dgegMunicipalityLisboaFixture,
  dgegMunicipalitySintraFixture,
  DGEGStationFuelFilters,
  dgegStationFuelsFixture,
  dgegStationTypeFixtures,
  dgegStationTypeHighwayFixture,
} from '../../http-client';
import { DGEGClient } from '../client';
import { STATION_PARAM_PAGE_SIZE } from '../client.constant';
import {
  brandsFixture,
  districtsFixture,
  fuelsFixture,
  municipalitiesFixture,
  stationsFixture,
  stationTypeFixtures,
} from './client.fixture';
import { createDGEGSuccessResponse, createError } from './client.spec-util';
import {
  MunicipalityFilters,
  StationFilters,
} from '../client.type';

describe('DGEGClient', () => {
  let mockHttpClient: Mocked<DGEGHttpClient>;
  let client: DGEGClient;
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    mockHttpClient = {
      getDistricts: vi.fn(),
      getMunicipalities: vi.fn(),
      getBrands: vi.fn(),
      getStationTypes: vi.fn(),
      getFuels: vi.fn(),
      getStations: vi.fn(),
    } as unknown as Mocked<DGEGHttpClient>;

    client = new DGEGClient(mockHttpClient);
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getDistricts', () => {
    it('should return an array of districts when the http-client request succeeds and provides outcome', async () => {
      // Assemble
      mockHttpClient.getDistricts.mockResolvedValueOnce(createDGEGSuccessResponse(dgegDistrictsFixture));

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(mockHttpClient.getDistricts).toHaveBeenCalledTimes(1);
      expect(districts).toEqual(districtsFixture);
    });

    it('should return an empty array when the http-client request succeeds but no outcome is provided', async () => {
      // Assemble
      mockHttpClient.getDistricts.mockResolvedValueOnce(createDGEGSuccessResponse());

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(mockHttpClient.getDistricts).toHaveBeenCalledTimes(1);
      expect(districts).toEqual([]);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      mockHttpClient.getDistricts.mockRejectedValueOnce(createError());

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(mockHttpClient.getDistricts).toHaveBeenCalledTimes(1);
      expect(districts).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch districts (Network error)');
    });
  });

  describe('getMunicipalities', () => {
    it('should return an array of municipalities when the http-client request succeeds and provides outcome (without filters)', async () => {
      // Assemble
      mockHttpClient.getMunicipalities.mockResolvedValueOnce(createDGEGSuccessResponse(dgegMunicipalitiesFixture));

      // Act
      const municipalities = await client.getMunicipalities();

      // Assert
      expect(mockHttpClient.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(municipalities).toEqual(municipalitiesFixture);
    });

    it('should return an array of municipalities when the http-client request succeeds and provides outcome (with filters)', async () => {
      // Assemble
      const filterDistrictId = dgegDistrictLisboaFixture.Id;
      const filters: MunicipalityFilters = { districtId: filterDistrictId };
      const expectedDgegFilters: DGEGMunicipalityFilters = { idDistrito: filterDistrictId };

      mockHttpClient.getMunicipalities.mockResolvedValueOnce(createDGEGSuccessResponse(dgegMunicipalitiesFixture));

      // Act
      const municipalities = await client.getMunicipalities(filters);

      // Assert
      expect(mockHttpClient.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(mockHttpClient.getMunicipalities).toHaveBeenCalledWith(expectedDgegFilters);
      expect(municipalities).toEqual(municipalitiesFixture);
    });

    it('should return an empty array when the http-client request succeeds but no outcome is provided', async () => {
      // Assemble
      mockHttpClient.getMunicipalities.mockResolvedValueOnce(createDGEGSuccessResponse());

      // Act
      const municipalities = await client.getMunicipalities();

      // Assert
      expect(mockHttpClient.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(municipalities).toEqual([]);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      mockHttpClient.getMunicipalities.mockRejectedValueOnce(createError());

      // Act
      const municipalities = await client.getMunicipalities();

      // Assert
      expect(mockHttpClient.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(municipalities).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch municipalities (Network error)');
    });
  });

  describe('getBrands', () => {
    it('should return an array of brands when the http-client request succeeds and provides outcome', async () => {
      // Assemble
      mockHttpClient.getBrands.mockResolvedValueOnce(createDGEGSuccessResponse(dgegBrandsFixture));

      // Act
      const brands = await client.getBrands();

      // Assert
      expect(mockHttpClient.getBrands).toHaveBeenCalledTimes(1);
      expect(brands).toEqual(brandsFixture);
    });

    it('should return an empty array when the http-client request succeeds but no outcome is provided', async () => {
      // Assemble
      mockHttpClient.getBrands.mockResolvedValueOnce(createDGEGSuccessResponse());

      // Act
      const brands = await client.getBrands();

      // Assert
      expect(mockHttpClient.getBrands).toHaveBeenCalledTimes(1);
      expect(brands).toEqual([]);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      mockHttpClient.getBrands.mockRejectedValueOnce(createError());

      // Act
      const brands = await client.getBrands();

      // Assert
      expect(mockHttpClient.getBrands).toHaveBeenCalledTimes(1);
      expect(brands).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch brands (Network error)');
    });
  });

  describe('getStationTypes', () => {
    it('should return an array of station types when the http-client request succeeds and provides outcome', async () => {
      // Assemble
      mockHttpClient.getStationTypes.mockResolvedValueOnce(createDGEGSuccessResponse(dgegStationTypeFixtures));

      // Act
      const stationTypes = await client.getStationTypes();

      // Assert
      expect(mockHttpClient.getStationTypes).toHaveBeenCalledTimes(1);
      expect(stationTypes).toEqual(stationTypeFixtures);
    });

    it('should return an empty array when the http-client request succeeds but no outcome is provided', async () => {
      // Assemble
      mockHttpClient.getStationTypes.mockResolvedValueOnce(createDGEGSuccessResponse());

      // Act
      const stationTypes = await client.getStationTypes();

      // Assert
      expect(mockHttpClient.getStationTypes).toHaveBeenCalledTimes(1);
      expect(stationTypes).toEqual([]);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      mockHttpClient.getStationTypes.mockRejectedValueOnce(createError());

      // Act
      const stationTypes = await client.getStationTypes();

      // Assert
      expect(mockHttpClient.getStationTypes).toHaveBeenCalledTimes(1);
      expect(stationTypes).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch station types (Network error)');
    });
  });

  describe('getFuels', () => {
    it('should return an array of fuels when the http-client request succeeds and provides outcome', async () => {
      // Assemble
      mockHttpClient.getFuels.mockResolvedValueOnce(createDGEGSuccessResponse(dgegFuelsFixture));

      // Act
      const fuels = await client.getFuels();

      // Assert
      expect(mockHttpClient.getFuels).toHaveBeenCalledTimes(1);
      expect(fuels).toEqual(fuelsFixture);
    });

    it('should return an empty array when the http-client request succeeds but no outcome is provided', async () => {
      // Assemble
      mockHttpClient.getFuels.mockResolvedValueOnce(createDGEGSuccessResponse());

      // Act
      const fuels = await client.getFuels();

      // Assert
      expect(mockHttpClient.getFuels).toHaveBeenCalledTimes(1);
      expect(fuels).toEqual([]);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      mockHttpClient.getFuels.mockRejectedValueOnce(createError());

      // Act
      const fuels = await client.getFuels();

      // Assert
      expect(mockHttpClient.getFuels).toHaveBeenCalledTimes(1);
      expect(fuels).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch fuels (Network error)');
    });
  });

  describe('getStations', () => {
    it('should return an array of stations when the http-client request succeeds and provides outcome (without filters)', async () => {
      // Assemble
      const filterDistrictId = dgegDistrictLisboaFixture.Id;
      const filterMunicipalityIds = [dgegMunicipalityLisboaFixture.Id, dgegMunicipalitySintraFixture.Id];
      const filterBrandId = dgegBrandAFixture.Id;
      const filterFuelTypeIds = [dgegFuelPetrolFixture.Id, dgegFuelGasFixture.Id];
      const filterStationTypeId = dgegStationTypeHighwayFixture.Id;

      const filters: StationFilters = {
        districtId: filterDistrictId,
        municipalityIds: filterMunicipalityIds,
        brandId: filterBrandId,
        fuelTypeIds: filterFuelTypeIds,
        stationTypeId: filterStationTypeId,
      };

      const expectedDgegFilters: DGEGStationFuelFilters = {
        idDistrito: filterDistrictId,
        idsMunicipios: filterMunicipalityIds,
        idMarca: filterBrandId,
        idsTiposComb: filterFuelTypeIds,
        idTipoPosto: filterStationTypeId,
        qtdPorPagina: STATION_PARAM_PAGE_SIZE,
      };

      mockHttpClient.getStations.mockResolvedValueOnce(createDGEGSuccessResponse(dgegStationFuelsFixture));
      mockHttpClient.getFuels.mockResolvedValueOnce(createDGEGSuccessResponse(dgegFuelsFixture));

      // Act
      const stations = await client.getStations(filters);

      // Assert
      expect(mockHttpClient.getStations).toHaveBeenCalledTimes(1);
      expect(mockHttpClient.getStations).toHaveBeenCalledWith(expectedDgegFilters);
      expect(stations).toEqual(stationsFixture);
    });

    it('should return an array of stations when the http-client request succeeds and provides outcome (with filters)', async () => {
      // Assemble
      mockHttpClient.getStations.mockResolvedValueOnce(createDGEGSuccessResponse(dgegStationFuelsFixture));
      mockHttpClient.getFuels.mockResolvedValueOnce(createDGEGSuccessResponse(dgegFuelsFixture));

      // Act
      const stations = await client.getStations();

      // Assert
      expect(mockHttpClient.getStations).toHaveBeenCalledTimes(1);
      expect(stations).toEqual(stationsFixture);
    });

    it('should return an empty array when the http-client request succeeds but no outcome is provided', async () => {
      // Assemble
      mockHttpClient.getStations.mockResolvedValueOnce(createDGEGSuccessResponse());

      // Act
      const stations = await client.getStations();

      // Assert
      expect(mockHttpClient.getStations).toHaveBeenCalledTimes(1);
      expect(stations).toEqual([]);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      mockHttpClient.getStations.mockRejectedValueOnce('Network error');

      // Act
      const stations = await client.getStations();

      // Assert
      expect(mockHttpClient.getStations).toHaveBeenCalledTimes(1);
      expect(stations).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch stations (Network error)');
    });
  });
});
