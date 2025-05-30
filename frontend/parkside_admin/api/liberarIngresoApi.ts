import api from './axiosConfig';
import { LiberarIngresoRequest, LiberarIngresoResponse } from '@/models/liberarIngresoModels';

export const liberarIngreso = async (
  data: LiberarIngresoRequest
): Promise<LiberarIngresoResponse> => {
  const response = await api.post<LiberarIngresoResponse>('/api/v1/flow/entry-register', data);
  return response.data;
};
