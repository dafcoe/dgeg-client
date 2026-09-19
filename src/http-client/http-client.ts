import {
  BRANDS_URL,
  DISTRICTS_URL,
  FUELS_URL,
  MUNICIPALITIES_URL,
  STATION_TYPES_URL,
  STATIONS_URL,
} from './http-client.constant';
import {
  DGEGBrand,
  DGEGDistrict,
  DGEGFuel,
  DGEGMunicipality,
  DGEGMunicipalityFilters,
  DGEGResponse,
  DGEGStationFuel,
  DGEGStationFuelFilters,
  DGEGStationType,
} from './http-client.type';

export class DGEGHttpClient {
  private headers = {
    Accept: 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  };

  /**
   * Generic HTTP fetch wrapper handling headers, status validation, and JSON parsing.
   */
  private async fetch<T>(url: string): Promise<DGEGResponse<T>> {
    const response = await fetch(url, { headers: this.headers });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return (await response.json()) as DGEGResponse<T>;
  }

  /**
   * Fetches raw districts from DGEG.
   */
  async getDistricts(): Promise<DGEGResponse<DGEGDistrict[]>> {
    return this.fetch<DGEGDistrict[]>(DISTRICTS_URL);
  }

  /**
   * Fetches raw municipalities from DGEG with optional query parameters.
   */
  async getMunicipalities(filters: DGEGMunicipalityFilters = {}): Promise<DGEGResponse<DGEGMunicipality[]>> {
    const params = new URLSearchParams();

    if (filters.idDistrito) params.append('idDistrito', String(filters.idDistrito));

    const municipalitiesUrl = params.size
      ? `${MUNICIPALITIES_URL}?${params.toString()}`
      : MUNICIPALITIES_URL;

    return this.fetch<DGEGMunicipality[]>(municipalitiesUrl);
  }

  /**
   * Fetches raw brands from DGEG.
   */
  async getBrands(): Promise<DGEGResponse<DGEGBrand[]>> {
    return this.fetch<DGEGBrand[]>(BRANDS_URL);
  }

  /**
   * Fetches raw station types from DGEG.
   */
  async getStationTypes(): Promise<DGEGResponse<DGEGStationType[]>> {
    return this.fetch<DGEGStationType[]>(STATION_TYPES_URL);
  }

  /**
   * Fetches raw fuels from DGEG.
   */
  async getFuels(): Promise<DGEGResponse<DGEGFuel[]>> {
    return this.fetch<DGEGFuel[]>(FUELS_URL);
  }

  /**
   * Fetches raw station fuels from DGEG with optional query parameters.
   */
  async getStations(filters: DGEGStationFuelFilters = {}): Promise<DGEGResponse<DGEGStationFuel[]>> {
    const params = new URLSearchParams();

    if (filters.idDistrito) params.append('idDistrito', String(filters.idDistrito));
    if (filters.idsMunicipios?.length) params.append('idsMunicipios', filters.idsMunicipios.join(','));
    if (filters.idMarca) params.append('idMarca', String(filters.idMarca));
    if (filters.idsTiposComb?.length) params.append('idsTiposComb', filters.idsTiposComb.join(','));
    if (filters.idTipoPosto) params.append('idTipoPosto', String(filters.idTipoPosto));
    if (filters.qtdPorPagina) params.append('qtdPorPagina', String(filters.qtdPorPagina));
    if (filters.pagina) params.append('pagina', String(filters.pagina));

    const stationsUrl = params.size
      ? `${STATIONS_URL}?${params.toString()}`
      : STATIONS_URL;

    return this.fetch<DGEGStationFuel[]>(stationsUrl);
  }
}
