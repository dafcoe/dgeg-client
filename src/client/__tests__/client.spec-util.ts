import { DGEGResponse } from '../../http-client';

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
