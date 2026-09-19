import { Mocked } from 'vitest';
import { DGEGHttpClient, DGEGResponse } from '../../http-client';
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
  brandsFixture,
  districtsFixture,
  fuelsFixture,
  municipalitiesFixture,
  stationsFixture,
  stationTypeFixtures,
} from './client.fixture';

export function createDGEGSuccessResponse<T>(result?: T): DGEGResponse<T> {
  return {
    resultado: result as T,
    sucesso: true,
    mensagem: null,
  };
}

export function createError(message = 'Network error'): Error {
  return new Error(message);
}

export function createHttpClientMock() {
  return {
    getDistricts: vi.fn(),
    getMunicipalities: vi.fn(),
    getBrands: vi.fn(),
    getStationTypes: vi.fn(),
    getFuels: vi.fn(),
    getStations: vi.fn(),
  } as unknown as Mocked<DGEGHttpClient>;
}

export function mockMappers() {
  vi.mocked(mapDGEGDistrictsToDistricts).mockReturnValue(districtsFixture);
  vi.mocked(mapDGEGMunicipalitiesToMunicipalities).mockReturnValue(municipalitiesFixture);
  vi.mocked(mapDGEGBrandsToBrands).mockReturnValue(brandsFixture);
  vi.mocked(mapDGEGStationTypesToStationTypes).mockReturnValue(stationTypeFixtures);
  vi.mocked(mapDGEGFuelsToFuels).mockReturnValue(fuelsFixture);
  vi.mocked(mapDGEGStationFuelsToStations).mockReturnValue(stationsFixture);
  vi.mocked(mapMunicipalityFiltersToDGEGMunicipalityFilters).mockReturnValue({});
  vi.mocked(mapStationFiltersToDGEGStationFilters).mockReturnValue({});
}
