import { DGEGHttpClient, DGEGStationFuelFilters } from '../http-client';
import { STATION_PARAM_PAGE_SIZE } from './client.constant';
import {
  mapDGEGBrandsToBrands,
  mapDGEGDistrictsToDistricts,
  mapDGEGFuelsToFuels,
  mapDGEGMunicipalitiesToMunicipalities,
  mapDGEGStationFuelsToStations, mapDGEGStationTypesToStationTypes,
  mapMunicipalityFiltersToDGEGMunicipalityFilters,
  mapStationFiltersToDGEGStationFilters,
} from './client.mapper';
import {
  Brand,
  District,
  Fuel,
  Municipality,
  MunicipalityFilters,
  Station,
  StationFilters,
} from './client.type';

export class DGEGClient {
  constructor(
    private readonly httpClient: DGEGHttpClient = new DGEGHttpClient(),
  ) {}

  /**
   * Generic fetch error logger.
   */
  private logFetchError(resource: string, error: unknown): void {
    const verboseError = error instanceof Error ? error.message : String(error);

    console.error(`Failed to fetch ${resource} (${verboseError})`);
  }

  /**
   * Fetches the complete list of available districts.
   */
  async getDistricts(): Promise<District[]> {
    try {
      const response = await this.httpClient.getDistricts();

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
  async getMunicipalities(filters: MunicipalityFilters = {}): Promise<Municipality[]> {
    try {
      const dgegFilters = mapMunicipalityFiltersToDGEGMunicipalityFilters(filters);
      const response = await this.httpClient.getMunicipalities(dgegFilters);

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
      const response = await this.httpClient.getBrands();

      if (!response.resultado) return [];

      return mapDGEGBrandsToBrands(response.resultado);
    } catch (error) {
      this.logFetchError('brands', error);

      return [];
    }
  }

  /**
   * Fetches the complete list of available station types.
   */
  async getStationTypes(): Promise<Brand[]> {
    try {
      const response = await this.httpClient.getStationTypes();

      if (!response.resultado) return [];

      return mapDGEGStationTypesToStationTypes(response.resultado);
    } catch (error) {
      this.logFetchError('station types', error);

      return [];
    }
  }

  /**
   * Fetches the complete list of available fuels.
   */
  async getFuels(): Promise<Fuel[]> {
    try {
      const response = await this.httpClient.getFuels();

      if (!response.resultado) return [];

      return mapDGEGFuelsToFuels(response.resultado);
    } catch (error) {
      this.logFetchError('fuels', error);

      return [];
    }
  }

  /**
   * Fetches stations and their fuel prices using optional filters.
   */
  async getStations(filters: StationFilters = {}): Promise<Station[]> {
    try {
      const dgegFilters: DGEGStationFuelFilters = {
        ...mapStationFiltersToDGEGStationFilters(filters),
        qtdPorPagina: STATION_PARAM_PAGE_SIZE,
      };
      const response = await this.httpClient.getStations(dgegFilters);

      if (!response.resultado) return [];

      return mapDGEGStationFuelsToStations(response.resultado);
    } catch (error) {
      this.logFetchError('stations', error);

      return [];
    }
  }
}
