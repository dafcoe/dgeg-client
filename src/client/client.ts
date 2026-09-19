import {
  DGEGHttpClient,
  DGEGResponse,
  DGEGStationFuelFilters,
} from '../http-client';
import { STATION_PARAM_PAGE_SIZE } from './client.constant';
import {
  mapDGEGBrandsToBrands,
  mapDGEGDistrictsToDistricts,
  mapDGEGFuelsToFuels,
  mapDGEGMunicipalitiesToMunicipalities,
  mapDGEGStationFuelsToStations,
  mapDGEGStationTypesToStationTypes,
  mapMunicipalityFiltersToDGEGMunicipalityFilters,
  mapStationFiltersToDGEGStationFilters,
} from './client.mapper';
import {
  Brand,
  CacheResource,
  District,
  FetchOptions,
  Fuel,
  Municipality,
  MunicipalityFilters,
  Station,
  StationFilters,
  StationType,
} from './client.type';

export class DGEGClient {
  private districtsPromise: Promise<District[]> | null = null;
  private municipalitiesPromises = new Map<number | 'ALL', Promise<Municipality[]>>();
  private brandsPromise: Promise<Brand[]> | null = null;
  private stationTypesPromise: Promise<StationType[]> | null = null;
  private fuelsPromise: Promise<Fuel[]> | null = null;

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
   * Generic helper to fetch reference data with promise memoization and error-handling.
   */
  private fetchAndCache<T, R>(
    resource: string,
    currentPromise: Promise<T[]> | null,
    setPromise: (promise: Promise<T[]> | null) => void,
    fetchFn: () => Promise<DGEGResponse<R[]>>,
    mapFn: (data: R[]) => T[],
    options?: FetchOptions,
  ): Promise<T[]> {
    if (currentPromise && !options?.forceRefresh) return currentPromise;

    const promise = (async () => {
      try {
        const response = await fetchFn();

        if (!response.resultado) {
          setPromise(null);
          return [];
        }

        return mapFn(response.resultado);
      } catch (error) {
        setPromise(null);
        this.logFetchError(resource, error);

        return [];
      }
    })();

    setPromise(promise);
    return promise;
  }

  /**
   * Fetches the complete list of available districts.
   * Results are cached in memory. Use `forceRefresh: true` to bypass cache.
   */
  async getDistricts(options?: FetchOptions): Promise<District[]> {
    return this.fetchAndCache(
      'districts',
      this.districtsPromise,
      (promise) => { this.districtsPromise = promise; },
      () => this.httpClient.getDistricts(),
      mapDGEGDistrictsToDistricts,
      options,
    );
  }

  /**
   * Fetches municipalities, optionally filtered by district ID.
   * Results are cached in memory. Use `forceRefresh: true` to bypass cache.
   */
  async getMunicipalities(
    filters: MunicipalityFilters = {},
    options?: FetchOptions,
  ): Promise<Municipality[]> {
    const cacheKey = filters.districtId ?? 'ALL';
    const currentPromise = this.municipalitiesPromises.get(cacheKey) ?? null;

    return this.fetchAndCache(
      'municipalities',
      currentPromise,
      (promise) => {
        if (promise) this.municipalitiesPromises.set(cacheKey, promise);
        else this.municipalitiesPromises.delete(cacheKey);
      },
      () => {
        const dgegFilters = mapMunicipalityFiltersToDGEGMunicipalityFilters(filters);
        return this.httpClient.getMunicipalities(dgegFilters);
      },
      mapDGEGMunicipalitiesToMunicipalities,
      options,
    );
  }

  /**
   * Fetches the complete list of available brands.
   * Results are cached in memory. Use `forceRefresh: true` to bypass cache.
   */
  async getBrands(options?: FetchOptions): Promise<Brand[]> {
    return this.fetchAndCache(
      'brands',
      this.brandsPromise,
      (promise) => { this.brandsPromise = promise; },
      () => this.httpClient.getBrands(),
      mapDGEGBrandsToBrands,
      options,
    );
  }

  /**
   * Fetches the complete list of available station types.
   * Results are cached in memory. Use `forceRefresh: true` to bypass cache.
   */
  async getStationTypes(options?: FetchOptions): Promise<StationType[]> {
    return this.fetchAndCache(
      'station types',
      this.stationTypesPromise,
      (promise) => { this.stationTypesPromise = promise; },
      () => this.httpClient.getStationTypes(),
      mapDGEGStationTypesToStationTypes,
      options,
    );
  }

  /**
   * Fetches the complete list of available fuels.
   * Results are cached in memory. Use `forceRefresh: true` to bypass cache.
   */
  async getFuels(options?: FetchOptions): Promise<Fuel[]> {
    return this.fetchAndCache(
      'fuels',
      this.fuelsPromise,
      (promise) => { this.fuelsPromise = promise; },
      () => this.httpClient.getFuels(),
      mapDGEGFuelsToFuels,
      options,
    );
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

      const [response, fuels] = await Promise.all([
        this.httpClient.getStations(dgegFilters),
        this.getFuels(),
      ]);

      if (!response.resultado) return [];

      return mapDGEGStationFuelsToStations(response.resultado, fuels);
    } catch (error) {
      this.logFetchError('stations', error);

      return [];
    }
  }

  /**
   * Clears in-memory cached data.
   * Can clear all caches or a specific resource cache.
   */
  clearCache(resource?: CacheResource): void {
    if (!resource || resource === 'districts') this.districtsPromise = null;
    if (!resource || resource === 'municipalities') this.municipalitiesPromises.clear();
    if (!resource || resource === 'brands') this.brandsPromise = null;
    if (!resource || resource === 'stationTypes') this.stationTypesPromise = null;
    if (!resource || resource === 'fuels') this.fuelsPromise = null;
  }
}
