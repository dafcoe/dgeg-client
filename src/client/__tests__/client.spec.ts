import { Mocked, MockInstance } from 'vitest';
import {
  DGEGFuel,
  DGEGHttpClient,
  DGEGMunicipality,
  DGEGStationFuel,
} from '../../http-client';
import { DGEGClient } from '../client';
import { STATION_PARAM_PAGE_SIZE } from '../client.constant';
import {
  mapDGEGBrandsToBrands,
  mapDGEGDistrictsToDistricts,
  mapDGEGFuelsToFuels,
  mapDGEGMunicipalitiesToMunicipalities,
  mapDGEGStationFuelsToStations,
  mapDGEGStationTypesToStationTypes,
  mapMunicipalityFiltersToDGEGMunicipalityFilters,
  mapStationFiltersToDGEGStationFilters,
} from '../client.mapper';
import {
  MunicipalityFilters,
  StationFilters,
} from '../client.type';
import {
  brandsFixture,
  districtsFixture,
  fuelsFixture,
  municipalitiesFixture,
  stationsFixture,
  stationTypeFixtures,
} from './client.fixture';
import {
  createDGEGSuccessResponse,
  createError,
  createHttpClientMock,
  mockMappers,
} from './client.spec-util';

vi.mock('../client.mapper', () => ({
  mapDGEGBrandsToBrands: vi.fn(),
  mapDGEGDistrictsToDistricts: vi.fn(),
  mapDGEGFuelsToFuels: vi.fn(),
  mapDGEGMunicipalitiesToMunicipalities: vi.fn(),
  mapDGEGStationFuelsToStations: vi.fn(),
  mapDGEGStationTypesToStationTypes: vi.fn(),
  mapMunicipalityFiltersToDGEGMunicipalityFilters: vi.fn(),
  mapStationFiltersToDGEGStationFilters: vi.fn(),
}));

describe('DGEGClient', () => {
  let httpClientMock: Mocked<DGEGHttpClient>;
  let client: DGEGClient;
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    httpClientMock = createHttpClientMock();
    client = new DGEGClient(httpClientMock);
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockMappers();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getDistricts', () => {
    it('should return an array of districts when the http-client request succeeds and provides outcome', async () => {
      // Assemble
      const dgegDistricts = [{ Id: 1, Descritivo: 'Lisboa' }];
      httpClientMock.getDistricts.mockResolvedValueOnce(createDGEGSuccessResponse(dgegDistricts));

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(httpClientMock.getDistricts).toHaveBeenCalledTimes(1);
      expect(mapDGEGDistrictsToDistricts).toHaveBeenCalledWith(dgegDistricts);
      expect(districts).toEqual(districtsFixture);
    });

    it('should return an empty array when the http-client request succeeds but no outcome is provided', async () => {
      // Assemble
      httpClientMock.getDistricts.mockResolvedValueOnce(createDGEGSuccessResponse());

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(httpClientMock.getDistricts).toHaveBeenCalledTimes(1);
      expect(mapDGEGDistrictsToDistricts).not.toHaveBeenCalled();
      expect(districts).toEqual([]);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      httpClientMock.getDistricts.mockRejectedValueOnce(createError());

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(httpClientMock.getDistricts).toHaveBeenCalledTimes(1);
      expect(districts).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch districts (Network error)');
    });
  });

  describe('getMunicipalities', () => {
    it('should return an array of municipalities when the http-client request succeeds and provides outcome (without filters)', async () => {
      // Assemble
      const dgegMunicipalities = [{ Id: 1, Descritivo: 'Lisboa' }] as DGEGMunicipality[];
      httpClientMock.getMunicipalities.mockResolvedValueOnce(createDGEGSuccessResponse(dgegMunicipalities));

      // Act
      const municipalities = await client.getMunicipalities();

      // Assert
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledWith({});
      expect(mapDGEGMunicipalitiesToMunicipalities).toHaveBeenCalledWith(dgegMunicipalities);
      expect(municipalities).toEqual(municipalitiesFixture);
    });

    it('should return an array of municipalities when the http-client request succeeds and provides outcome (with filters)', async () => {
      // Assemble
      const filters: MunicipalityFilters = { districtId: 1 };
      const expectedDgegFilters = { idDistrito: 1 };
      const dgegMunicipalities = [{ Id: 1, Descritivo: 'Lisboa' }] as DGEGMunicipality[];

      vi.mocked(mapMunicipalityFiltersToDGEGMunicipalityFilters).mockReturnValueOnce(expectedDgegFilters);
      httpClientMock.getMunicipalities.mockResolvedValueOnce(createDGEGSuccessResponse(dgegMunicipalities));

      // Act
      const municipalities = await client.getMunicipalities(filters);

      // Assert
      expect(mapMunicipalityFiltersToDGEGMunicipalityFilters).toHaveBeenCalledWith(filters);
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledWith(expectedDgegFilters);
      expect(mapDGEGMunicipalitiesToMunicipalities).toHaveBeenCalledWith(dgegMunicipalities);
      expect(municipalities).toEqual(municipalitiesFixture);
    });

    it('should return an empty array when the http-client request succeeds but no outcome is provided', async () => {
      // Assemble
      httpClientMock.getMunicipalities.mockResolvedValueOnce(createDGEGSuccessResponse());

      // Act
      const municipalities = await client.getMunicipalities();

      // Assert
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(mapDGEGMunicipalitiesToMunicipalities).not.toHaveBeenCalled();
      expect(municipalities).toEqual([]);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      httpClientMock.getMunicipalities.mockRejectedValueOnce(createError());

      // Act
      const municipalities = await client.getMunicipalities();

      // Assert
      expect(httpClientMock.getMunicipalities).toHaveBeenCalledTimes(1);
      expect(municipalities).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch municipalities (Network error)');
    });
  });

  describe('getBrands', () => {
    it('should return an array of brands when the http-client request succeeds and provides outcome', async () => {
      // Assemble
      const dgegBrands = [{ Id: 1, Descritivo: 'Marca A' }];
      httpClientMock.getBrands.mockResolvedValueOnce(createDGEGSuccessResponse(dgegBrands));

      // Act
      const brands = await client.getBrands();

      // Assert
      expect(httpClientMock.getBrands).toHaveBeenCalledTimes(1);
      expect(mapDGEGBrandsToBrands).toHaveBeenCalledWith(dgegBrands);
      expect(brands).toEqual(brandsFixture);
    });

    it('should return an empty array when the http-client request succeeds but no outcome is provided', async () => {
      // Assemble
      httpClientMock.getBrands.mockResolvedValueOnce(createDGEGSuccessResponse());

      // Act
      const brands = await client.getBrands();

      // Assert
      expect(httpClientMock.getBrands).toHaveBeenCalledTimes(1);
      expect(mapDGEGBrandsToBrands).not.toHaveBeenCalled();
      expect(brands).toEqual([]);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      httpClientMock.getBrands.mockRejectedValueOnce(createError());

      // Act
      const brands = await client.getBrands();

      // Assert
      expect(httpClientMock.getBrands).toHaveBeenCalledTimes(1);
      expect(brands).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch brands (Network error)');
    });
  });

  describe('getStationTypes', () => {
    it('should return an array of station types when the http-client request succeeds and provides outcome', async () => {
      // Assemble
      const dgegStationTypes = [{ Id: 1, Descritivo: 'Autoestrada' }];
      httpClientMock.getStationTypes.mockResolvedValueOnce(createDGEGSuccessResponse(dgegStationTypes));

      // Act
      const stationTypes = await client.getStationTypes();

      // Assert
      expect(httpClientMock.getStationTypes).toHaveBeenCalledTimes(1);
      expect(mapDGEGStationTypesToStationTypes).toHaveBeenCalledWith(dgegStationTypes);
      expect(stationTypes).toEqual(stationTypeFixtures);
    });

    it('should return an empty array when the http-client request succeeds but no outcome is provided', async () => {
      // Assemble
      httpClientMock.getStationTypes.mockResolvedValueOnce(createDGEGSuccessResponse());

      // Act
      const stationTypes = await client.getStationTypes();

      // Assert
      expect(httpClientMock.getStationTypes).toHaveBeenCalledTimes(1);
      expect(mapDGEGStationTypesToStationTypes).not.toHaveBeenCalled();
      expect(stationTypes).toEqual([]);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      httpClientMock.getStationTypes.mockRejectedValueOnce(createError());

      // Act
      const stationTypes = await client.getStationTypes();

      // Assert
      expect(httpClientMock.getStationTypes).toHaveBeenCalledTimes(1);
      expect(stationTypes).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch station types (Network error)');
    });
  });

  describe('getFuels', () => {
    it('should return an array of fuels when the http-client request succeeds and provides outcome', async () => {
      // Assemble
      const dgegFuels = [{ Id: 1, Descritivo: 'Gasolina' }] as DGEGFuel[];
      httpClientMock.getFuels.mockResolvedValueOnce(createDGEGSuccessResponse(dgegFuels));

      // Act
      const fuels = await client.getFuels();

      // Assert
      expect(httpClientMock.getFuels).toHaveBeenCalledTimes(1);
      expect(mapDGEGFuelsToFuels).toHaveBeenCalledWith(dgegFuels);
      expect(fuels).toEqual(fuelsFixture);
    });

    it('should return an empty array when the http-client request succeeds but no outcome is provided', async () => {
      // Assemble
      httpClientMock.getFuels.mockResolvedValueOnce(createDGEGSuccessResponse());

      // Act
      const fuels = await client.getFuels();

      // Assert
      expect(httpClientMock.getFuels).toHaveBeenCalledTimes(1);
      expect(mapDGEGFuelsToFuels).not.toHaveBeenCalled();
      expect(fuels).toEqual([]);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      httpClientMock.getFuels.mockRejectedValueOnce(createError());

      // Act
      const fuels = await client.getFuels();

      // Assert
      expect(httpClientMock.getFuels).toHaveBeenCalledTimes(1);
      expect(fuels).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch fuels (Network error)');
    });
  });

  describe('getStations', () => {
    it('should return an array of stations when the http-client request succeeds and provides outcome (without filters)', async () => {
      // Assemble
      const dgegStationFuels = [{ Id: 1, Nome: 'Estação A' }] as DGEGStationFuel[];
      const dgegFuels = [{ Id: 1, Descritivo: 'Gasolina' }] as DGEGFuel[];

      httpClientMock.getStations.mockResolvedValueOnce(createDGEGSuccessResponse(dgegStationFuels));
      httpClientMock.getFuels.mockResolvedValueOnce(createDGEGSuccessResponse(dgegFuels));

      // Act
      const stations = await client.getStations();

      // Assert
      expect(httpClientMock.getStations).toHaveBeenCalledTimes(1);
      expect(httpClientMock.getStations).toHaveBeenCalledWith({ qtdPorPagina: STATION_PARAM_PAGE_SIZE });
      expect(mapDGEGStationFuelsToStations).toHaveBeenCalledWith(dgegStationFuels, fuelsFixture);
      expect(stations).toEqual(stationsFixture);
    });

    it('should return an array of stations when the http-client request succeeds and provides outcome (with filters)', async () => {
      // Assemble
      const filters: StationFilters = {
        districtId: 1,
        municipalityIds: [1, 2],
        brandId: 1,
        fuelTypeIds: [1, 2],
        stationTypeId: 1,
      };

      const mappedFilters = {
        idDistrito: 1,
        idsMunicipios: [1, 2],
        idMarca: 1,
        idsTiposComb: [1, 2],
        idTipoPosto: 1,
      };

      const dgegStationFuels = [{ Id: 1, Nome: 'Estação A' }] as DGEGStationFuel[];
      const dgegFuels = [{ Id: 1, Descritivo: 'Gasolina' }] as DGEGFuel[];

      vi.mocked(mapStationFiltersToDGEGStationFilters).mockReturnValueOnce(mappedFilters);
      httpClientMock.getStations.mockResolvedValueOnce(createDGEGSuccessResponse(dgegStationFuels));
      httpClientMock.getFuels.mockResolvedValueOnce(createDGEGSuccessResponse(dgegFuels));

      // Act
      const stations = await client.getStations(filters);

      // Assert
      expect(mapStationFiltersToDGEGStationFilters).toHaveBeenCalledWith(filters);
      expect(httpClientMock.getStations).toHaveBeenCalledTimes(1);
      expect(httpClientMock.getStations).toHaveBeenCalledWith({
        ...mappedFilters,
        qtdPorPagina: STATION_PARAM_PAGE_SIZE,
      });
      expect(mapDGEGStationFuelsToStations).toHaveBeenCalledWith(dgegStationFuels, fuelsFixture);
      expect(stations).toEqual(stationsFixture);
    });

    it('should return an empty array when the http-client request succeeds but no outcome is provided', async () => {
      // Assemble
      const dgegFuels = [{ Id: 1, Descritivo: 'Gasolina' }] as DGEGFuel[];

      httpClientMock.getStations.mockResolvedValueOnce(createDGEGSuccessResponse());
      httpClientMock.getFuels.mockResolvedValueOnce(createDGEGSuccessResponse(dgegFuels));

      // Act
      const stations = await client.getStations();

      // Assert
      expect(httpClientMock.getStations).toHaveBeenCalledTimes(1);
      expect(mapDGEGStationFuelsToStations).not.toHaveBeenCalled();
      expect(stations).toEqual([]);
    });

    it('should return an empty array and log an error when the http-client request fails', async () => {
      // Assemble
      httpClientMock.getStations.mockRejectedValueOnce('Network error');

      // Act
      const stations = await client.getStations();

      // Assert
      expect(httpClientMock.getStations).toHaveBeenCalledTimes(1);
      expect(stations).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch stations (Network error)');
    });
  });
});
