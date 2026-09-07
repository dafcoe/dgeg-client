import { DGEGClient } from './client';
import {
  BRANDS_URL,
  DISTRICTS_URL,
  FUELS_URL,
  MUNICIPALITIES_URL,
  STATION_PARAM_PAGE_SIZE,
  STATIONS_URL,
} from './client.constant';
import {
  brandsFixture,
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
  districtsFixture,
  fuelsFixture,
  municipalitiesFixture,
  stationsFixture,
} from './client.fixture';

function mockFetchSuccessWithResult<T>(result: T) {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => ({
      resultado: result,
      sucesso: true,
      mensagem: null,
    }),
  } as Response);
}

function mockFetchFailure() {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: false,
    status: 500,
  } as Response);
}

describe('DGEGClient', () => {
  let client: DGEGClient;

  beforeEach(() => {
    client = new DGEGClient();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('logFetchError', () => {
    it('should format an error using error.message when a standard Error instance is thrown', async () => {
      // Assemble
      vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network connection timeout'));

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(districts).toEqual([]);
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch districts (Network connection timeout)',
      );
    });

    it('should format an error using String(error) when a non-Error value is thrown', async () => {
      // Assemble
      vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce('Critical infrastructure failure');

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(districts).toEqual([]);
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch districts (Critical infrastructure failure)',
      );
    });
  });

  describe('getDistricts', () => {
    it('should return an array of districts if HTTP request succeeds and "resultado" is provided', async () => {
      // Assemble
      mockFetchSuccessWithResult(dgegDistrictsFixture);

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        DISTRICTS_URL,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(districts).toEqual(districtsFixture);
    });

    it('should return an empty array if HTTP request succeeds but "resultado" is not provided', async () => {
      // Assemble
      mockFetchSuccessWithResult(undefined);

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        DISTRICTS_URL,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(districts).toEqual([]);
    });

    it('should return an empty array if HTTP request fails', async () => {
      // Assemble
      mockFetchFailure();

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        DISTRICTS_URL,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(districts).toEqual([]);
      expect(console.error).toHaveBeenCalledWith('Failed to fetch districts (HTTP error 500)');
    });
  });

  describe('getMunicipalities', () => {
    it('should return an array of municipalities if HTTP request succeeds and "resultado" is provided (without query params)', async () => {
      // Assemble
      mockFetchSuccessWithResult(dgegMunicipalitiesFixture);

      // Act
      const municipalities = await client.getMunicipalities();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        MUNICIPALITIES_URL,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(municipalities).toEqual(municipalitiesFixture);
    });

    it('should return an array of municipalities if HTTP request succeeds and "resultado" is provided (with query params)', async () => {
      // Assemble
      const districtId = dgegMunicipalityLisboaFixture.Id;
      const expectedUrl = `${MUNICIPALITIES_URL}?idDistrito=${districtId}`;
      mockFetchSuccessWithResult(dgegMunicipalitiesFixture);

      // Act
      const municipalities = await client.getMunicipalities(districtId);

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        expectedUrl,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(municipalities).toEqual(municipalitiesFixture);
    });

    it('should return an empty array if HTTP request succeeds but "resultado" is not provided', async () => {
      // Assemble
      mockFetchSuccessWithResult(undefined);

      // Act
      const municipalities = await client.getMunicipalities();

      // Assert
      expect(municipalities).toEqual([]);
    });

    it('should return an empty array if HTTP request fails', async () => {
      // Assemble
      mockFetchFailure();

      // Act
      const municipalities = await client.getMunicipalities();

      // Assert
      expect(municipalities).toEqual([]);
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch municipalities (HTTP error 500)',
      );
    });
  });

  describe('getBrands', () => {
    it('should return an array of brands if HTTP request succeeds and "resultado" is provided', async () => {
      // Assemble
      mockFetchSuccessWithResult(dgegBrandsFixture);

      // Act
      const brands = await client.getBrands();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        BRANDS_URL,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(brands).toEqual(brandsFixture);
    });

    it('should return an empty array if HTTP request succeeds but "resultado" is not provided', async () => {
      // Assemble
      mockFetchSuccessWithResult(undefined);

      // Act
      const brands = await client.getBrands();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        BRANDS_URL,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(brands).toEqual([]);
    });

    it('should return an empty array if HTTP request fails', async () => {
      // Assemble
      mockFetchFailure();

      // Act
      const brands = await client.getBrands();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        BRANDS_URL,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(brands).toEqual([]);
      expect(console.error).toHaveBeenCalledWith('Failed to fetch brands (HTTP error 500)');
    });
  });

  describe('getFuels', () => {
    it('should return an array of fuels if HTTP request succeeds and "resultado" is provided', async () => {
      // Assemble
      mockFetchSuccessWithResult(dgegFuelsFixture);

      // Act
      const fuels = await client.getFuels();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        FUELS_URL,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(fuels).toEqual(fuelsFixture);
    });

    it('should return an empty array if HTTP request succeeds but "resultado" is not provided', async () => {
      // Assemble
      mockFetchSuccessWithResult(undefined);

      // Act
      const fuels = await client.getFuels();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        FUELS_URL,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(fuels).toEqual([]);
    });

    it('should return an empty array if HTTP request fails', async () => {
      // Assemble
      mockFetchFailure();

      // Act
      const fuels = await client.getFuels();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        FUELS_URL,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(fuels).toEqual([]);
      expect(console.error).toHaveBeenCalledWith('Failed to fetch fuels (HTTP error 500)');
    });
  });

  describe('getStations', () => {
    it('should return an array of stations if HTTP request succeeds and "resultado" is provided (without query params)', async () => {
      // Assemble
      const expectedUrl = `${STATIONS_URL}?qtdPorPagina=${STATION_PARAM_PAGE_SIZE}`;
      mockFetchSuccessWithResult(dgegStationFuelsFixture);

      // Act
      const stations = await client.getStations();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        expectedUrl,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(stations).toEqual(stationsFixture);
    });

    it('should return an array of stations if HTTP request succeeds and "resultado" is provided (with query params)', async () => {
      // Assemble
      const districtId = dgegMunicipalityLisboaFixture.Id;
      const municipalityIds = [dgegMunicipalityLisboaFixture.Id, dgegMunicipalitySintraFixture.Id];
      const brandId = dgegBrandAFixture.Id;
      const fuelTypeIds = [dgegFuelPetrolFixture.Id, dgegFuelGasFixture.Id];
      const stationTypeId = 1;
      const expectedUrl = `${STATIONS_URL}?idDistrito=${districtId}&idsMunicipios=${municipalityIds.join('%2C')}&idMarca=${brandId}&idsTiposComb=${fuelTypeIds.join('%2C')}&idTipoPosto=${stationTypeId}&qtdPorPagina=${STATION_PARAM_PAGE_SIZE}`;
      mockFetchSuccessWithResult(dgegStationFuelsFixture);

      // Act
      const stations = await client.getStations({
        districtId,
        municipalityIds,
        brandId,
        fuelTypeIds,
        stationTypeId,
      });

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        expectedUrl,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(stations).toEqual(stationsFixture);
    });

    it('should return an empty array if HTTP request succeeds but "resultado" is not provided', async () => {
      // Assemble
      mockFetchSuccessWithResult(undefined);

      // Act
      const stations = await client.getStations();

      // Assert
      expect(stations).toEqual([]);
    });

    it('should return an empty array if HTTP request fails', async () => {
      // Assemble
      mockFetchFailure();

      // Act
      const stations = await client.getStations();

      // Assert
      expect(stations).toEqual([]);
      expect(console.error).toHaveBeenCalledWith('Failed to fetch stations (HTTP error 500)');
    });
  });
});
