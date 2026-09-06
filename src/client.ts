import { DISTRICT_URL } from './client.constant';
import { mapDGEGDistrictsToDistricts } from './client.mapper';
import type { District, DGEGResponse, DGEGDistrict } from './client.type';

export class DGEGClient {
  private headers = {
    Accept: 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  };

  /**
   * Fetches the complete list of available districts.
   */
  async getDistricts(): Promise<District[]> {
    try {
      const response = await fetch(DISTRICT_URL, {
        headers: this.headers,
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const data: DGEGResponse<DGEGDistrict[]> = await response.json();

      return mapDGEGDistrictsToDistricts(data.resultado || []);
    } catch (error) {
      console.error(`Failed to fetch districts (${error})`);

      return [];
    }
  }
}
