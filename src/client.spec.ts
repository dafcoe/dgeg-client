import { DGEGClient } from './client';
import { DISTRICT_URL } from './client.constant';
import { dgegDistrictsFixture, districtsFixture } from './client.fixture';

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

  describe('getDistricts', () => {
    it('should return an array of districts if HTTP request succeeds and "resultado" is provided', async () => {
      // Assemble
      mockFetchSuccessWithResult(dgegDistrictsFixture);

      // Act
      const districts = await client.getDistricts();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        DISTRICT_URL,
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
        DISTRICT_URL,
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
        DISTRICT_URL,
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(districts).toEqual([]);
      expect(console.error).toHaveBeenCalledWith('Failed to fetch districts (Error: HTTP error 500)');
    });
  });
});
