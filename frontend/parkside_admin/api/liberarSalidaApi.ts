import api from './axiosConfig';
import { LiberarSalidaRequest, LiberarSalidaResponse } from '@/models/liberarSalidaModels';

export const liberarSalida = async (
  data: LiberarSalidaRequest
): Promise<LiberarSalidaResponse> => {
  const response = await api.post<LiberarSalidaResponse>('/api/v1/flow/exit-register', data);
  return response.data;
};
