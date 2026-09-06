export interface DGEGDistrict {
  Id: number;
  Descritivo: string;
}

export interface District {
  id: number;
  name: string;
}

export interface DGEGResponse<T> {
  resultado: T;
  sucesso: boolean;
  mensagem: string | null;
}
