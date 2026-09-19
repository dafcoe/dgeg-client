import { DGEGHttpClient } from '../http-client';
import {
  BRANDS_URL,
  DISTRICTS_URL,
  FUELS_URL,
  MUNICIPALITIES_URL,
  STATION_TYPES_URL,
  STATIONS_URL,
} from '../http-client.constant';
import { DGEGMunicipalityFilters, DGEGStationFuelFilters } from '../http-client.type';
import {
  dgegBrandAFixture,
  dgegBrandsFixture,
  dgegDistrictsFixture,
  dgegFuelGasFixture,
  dgegFuelPetrolFixture,
  dgegFuelsFixture,
  dgegMunicipalitiesFixture,
  dgegMunicipalityLisboaFixture,
  dgegMunicipalitySintraFixture,
  dgegStationFuelsFixture,
  dgegStationTypeFixtures,
  dgegStationTypeHighwayFixture,
} from './http-client.fixture';
import {
  expectFetchCallWithUrlAndHeaders,
  mockFetchFailure,
  mockFetchSuccess,
} from './http-client.spec-util';

describe('DGEGHttpClient', () => {
  let httpClient: DGEGHttpClient;

  beforeEach(() => {
    httpClient = new DGEGHttpClient();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getDistricts', () => {
    it('should call DISTRICTS_URL with the correct headers and return a district DTO response', async () => {
      // Assemble
      mockFetchSuccess(dgegDistrictsFixture);

      // Act
      const response = await httpClient.getDistricts();

      // Assert
      expectFetchCallWithUrlAndHeaders(DISTRICTS_URL);
      expect(response.resultado).toEqual(dgegDistrictsFixture);
    });

    it('should call DISTRICTS_URL with the correct headers and throw an error when HTTP response is not ok', async () => {
      // Assemble
      mockFetchFailure(404);

      // Act
      const response = httpClient.getDistricts();

      // Assert
      expectFetchCallWithUrlAndHeaders(DISTRICTS_URL);
      await expect(response).rejects.toThrow('HTTP error 404');
    });
  });

  describe('getMunicipalities', () => {
    it('should call MUNICIPALITIES_URL with the correct headers and return a municipality DTO response (without query params when omitted)', async () => {
      // Assemble
      mockFetchSuccess(dgegMunicipalitiesFixture);

      // Act
      const response = await httpClient.getMunicipalities();

      // Assert
      expectFetchCallWithUrlAndHeaders(MUNICIPALITIES_URL);
      expect(response.resultado).toEqual(dgegMunicipalitiesFixture);
    });

    it('should call MUNICIPALITIES_URL with the correct headers and return a municipality DTO response (with query params when provided)', async () => {
      // Assemble
      const districtId = dgegMunicipalityLisboaFixture.Id;
      const municipalityFilters: DGEGMunicipalityFilters = { idDistrito: districtId };
      const expectedMunicipalitiesUrl = `${MUNICIPALITIES_URL}?idDistrito=${districtId}`;
      mockFetchSuccess(dgegMunicipalitiesFixture);

      // Act
      const response = await httpClient.getMunicipalities(municipalityFilters);

      // Assert
      expectFetchCallWithUrlAndHeaders(expectedMunicipalitiesUrl);
      expect(response.resultado).toEqual(dgegMunicipalitiesFixture);
    });

    it('should call MUNICIPALITIES_URL with the correct headers and throw an error when HTTP response is not ok', async () => {
      // Assemble
      mockFetchFailure(404);

      // Act
      const response = httpClient.getMunicipalities();

      // Assert
      expectFetchCallWithUrlAndHeaders(MUNICIPALITIES_URL);
      await expect(response).rejects.toThrow('HTTP error 404');
    });
  });

  describe('getBrands', () => {
    it('should call BRANDS_URL with the correct headers and return a brand DTO response', async () => {
      // Assemble
      mockFetchSuccess(dgegBrandsFixture);

      // Act
      const response = await httpClient.getBrands();

      // Assert
      expectFetchCallWithUrlAndHeaders(BRANDS_URL);
      expect(response.resultado).toEqual(dgegBrandsFixture);
    });

    it('should call BRANDS_URL with the correct headers and throw an error when HTTP response is not ok', async () => {
      // Assemble
      mockFetchFailure(404);

      // Act
      const response = httpClient.getBrands();

      // Assert
      expectFetchCallWithUrlAndHeaders(BRANDS_URL);
      await expect(response).rejects.toThrow('HTTP error 404');
    });
  });

  describe('getStationTypes', () => {
    it('should call STATION_TYPES_URL with the correct headers and return a station type DTO response', async () => {
      // Assemble
      mockFetchSuccess(dgegStationTypeFixtures);

      // Act
      const response = await httpClient.getStationTypes();

      // Assert
      expectFetchCallWithUrlAndHeaders(STATION_TYPES_URL);
      expect(response.resultado).toEqual(dgegStationTypeFixtures);
    });

    it('should call STATION_TYPES_URL with the correct headers and throw an error when HTTP response is not ok', async () => {
      // Assemble
      mockFetchFailure(404);

      // Act
      const response = httpClient.getStationTypes();

      // Assert
      expectFetchCallWithUrlAndHeaders(STATION_TYPES_URL);
      await expect(response).rejects.toThrow('HTTP error 404');
    });
  });

  describe('getFuels', () => {
    it('should call FUELS_URL with the correct headers and return a fuel DTO response', async () => {
      // Assemble
      mockFetchSuccess(dgegFuelsFixture);

      // Act
      const response = await httpClient.getFuels();

      // Assert
      expectFetchCallWithUrlAndHeaders(FUELS_URL);
      expect(response.resultado).toEqual(dgegFuelsFixture);
    });

    it('should call FUELS_URL with the correct headers and throw an error when HTTP response is not ok', async () => {
      // Assemble
      mockFetchFailure(404);

      // Act
      const response = httpClient.getFuels();

      // Assert
      expectFetchCallWithUrlAndHeaders(FUELS_URL);
      await expect(response).rejects.toThrow('HTTP error 404');
    });
  });

  describe('getStations', () => {
    it('should call STATIONS_URL with the correct headers and return a station DTO response (without query params when omitted)', async () => {
      // Assemble
      mockFetchSuccess(dgegStationFuelsFixture);

      // Act
      const response = await httpClient.getStations();

      // Assert
      expectFetchCallWithUrlAndHeaders(STATIONS_URL);
      expect(response.resultado).toEqual(dgegStationFuelsFixture);
    });

    it('should call STATIONS_URL with the correct headers and return a station DTO response (with query params when provided)', async () => {
      // Assemble
      const districtId = dgegMunicipalityLisboaFixture.Id;
      const municipalityIds = [dgegMunicipalityLisboaFixture.Id, dgegMunicipalitySintraFixture.Id];
      const brandId = dgegBrandAFixture.Id;
      const fuelTypeIds = [dgegFuelPetrolFixture.Id, dgegFuelGasFixture.Id];
      const stationTypeId = dgegStationTypeHighwayFixture.Id;
      const itemsPerPage = 10;
      const page = 2;
      const stationFilters: DGEGStationFuelFilters = {
        idDistrito: districtId,
        idsMunicipios: municipalityIds,
        idMarca: brandId,
        idsTiposComb: fuelTypeIds,
        idTipoPosto: stationTypeId,
        qtdPorPagina: itemsPerPage,
        pagina: page,
      };
      const expectedStationsUrl = `${STATIONS_URL}?idDistrito=${districtId}&idsMunicipios=${municipalityIds.join('%2C')}&idMarca=${brandId}&idsTiposComb=${fuelTypeIds.join('%2C')}&idTipoPosto=${stationTypeId}&qtdPorPagina=${itemsPerPage}&pagina=${page}`;
      mockFetchSuccess(dgegStationFuelsFixture);

      // Act
      const response = await httpClient.getStations(stationFilters);

      // Assert
      expectFetchCallWithUrlAndHeaders(expectedStationsUrl);
      expect(response.resultado).toEqual(dgegStationFuelsFixture);
    });

    it('should call STATIONS_URL with the correct headers and throw an error when HTTP response is not ok', async () => {
      // Assemble
      mockFetchFailure(404);

      // Act
      const response = httpClient.getStations();

      // Assert
      expectFetchCallWithUrlAndHeaders(STATIONS_URL);
      await expect(response).rejects.toThrow('HTTP error 404');
    });
  });
});
