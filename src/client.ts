import { BRANDS_URL, DISTRICTS_URL, FUELS_URL, MUNICIPALITIES_URL } from './client.constant';
import {
  mapDGEGBrandsToBrands,
  mapDGEGDistrictsToDistricts,
  mapDGEGFuelsToFuels,
  mapDGEGMunicipalitiesToMunicipalities,
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
      const municipalityUrl = districtId
        ? `${MUNICIPALITIES_URL}?idDistrito=${districtId}`
        : MUNICIPALITIES_URL;

      const response = await this.fetch<DGEGMunicipality[]>(municipalityUrl);

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
}
