import {
  BRANDS_URL,
  DISTRICTS_URL,
  FUELS_URL,
  MUNICIPALITIES_URL,
  STATION_PARAM_PAGE_SIZE,
  STATIONS_URL,
} from './client.constant';
import {
  mapDGEGBrandsToBrands,
  mapDGEGDistrictsToDistricts,
  mapDGEGFuelsToFuels,
  mapDGEGMunicipalitiesToMunicipalities,
  mapDGEGStationFuelsToStations,
} from './client.mapper';
import type {
  District,
  DGEGResponse,
  DGEGDistrict,
  Municipality,
  DGEGMunicipality,
  DGEGBrand,
  Fuel,
  Brand,
  DGEGFuel,
  StationFilters,
  Station, DGEGStationFuel,
} from './client.type';

export class DGEGClient {
  private headers = {
    Accept: 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  };

  /**
   * Generic HTTP fetch wrapper handling common headers, errors, and JSON parsing.
   */
  private async fetch<T>(url: string): Promise<DGEGResponse<T>> {
    const response = await fetch(url, { headers: this.headers });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return (await response.json()) as DGEGResponse<T>;
  }

  /**
   * Generic fetch error logger
   */
  private logFetchError(fetchResource: string, error: unknown): void {
    const verboseError = error instanceof Error ? error.message : String(error);

    console.error(`Failed to fetch ${fetchResource} (${verboseError})`);
  }

  /**
   * Fetches the complete list of available districts.
   */
  async getDistricts(): Promise<District[]> {
    try {
      const response = await this.fetch<DGEGDistrict[]>(DISTRICTS_URL);

      if (!response.resultado) return [];

      return mapDGEGDistrictsToDistricts(response.resultado);
    } catch (error) {
      this.logFetchError('districts', error);

      return [];
    }
  }

  /**
   * Fetches municipalities, optionally filtered by district ID.
   */
  async getMunicipalities(districtId?: number): Promise<Municipality[]> {
    try {
      const params = new URLSearchParams();

      if (districtId) params.append('idDistrito', String(districtId));
      const municipalitiesUrl = districtId
        ? `${MUNICIPALITIES_URL}?${params.toString()}`
        : MUNICIPALITIES_URL;

      const response = await this.fetch<DGEGMunicipality[]>(municipalitiesUrl);

      if (!response.resultado) return [];

      return mapDGEGMunicipalitiesToMunicipalities(response.resultado);
    } catch (error) {
      this.logFetchError('municipalities', error);

      return [];
    }
  }

  /**
   * Fetches the complete list of available brands.
   */
  async getBrands(): Promise<Brand[]> {
    try {
      const response = await this.fetch<DGEGBrand[]>(BRANDS_URL);

      if (!response.resultado) return [];

      return mapDGEGBrandsToBrands(response.resultado);
    } catch (error) {
      this.logFetchError('brands', error);

      return [];
    }
  }

  /**
   * Fetches the complete list of available fuels.
   */
  async getFuels(): Promise<Fuel[]> {
    try {
      const response = await this.fetch<DGEGFuel[]>(FUELS_URL);

      if (!response.resultado) return [];

      return mapDGEGFuelsToFuels(response.resultado);
    } catch (error) {
      this.logFetchError('fuels', error);

      return [];
    }
  }

  /**
   * Fetches stations, optionally filtered by district ID, municipality ID, brand ID and fuel type IDs.
   */
  async getStations(filters: StationFilters = {}): Promise<Station[]> {
    try {
      const params = new URLSearchParams();

      if (filters.districtId) params.append('idDistrito', String(filters.districtId));
      if (filters.municipalityIds?.length) params.append('idsMunicipios', filters.municipalityIds.join(','));
      if (filters.brandId) params.append('idMarca', String(filters.brandId));
      if (filters.fuelTypeIds?.length) params.append('idsTiposComb', filters.fuelTypeIds.join(','));
      if (filters.stationTypeId) params.append('idTipoPosto', String(filters.stationTypeId));
      params.append('qtdPorPagina', STATION_PARAM_PAGE_SIZE);

      const stationsUrl = `${STATIONS_URL}?${params.toString()}`;
      const response = await this.fetch<DGEGStationFuel[]>(stationsUrl);

      if (!response.resultado) return [];

      return mapDGEGStationFuelsToStations(response.resultado);
    } catch (error) {
      this.logFetchError('stations', error);

      return [];
    }
  }
}
