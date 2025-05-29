import api from '../api/axiosConfig';
import {
  SearchRegistrationByPlateRequest,
  SearchRegistrationByPlateResponse
} from '@/models/registroSalidaModels';

export const getRegistroSalida = async (
  data: SearchRegistrationByPlateRequest
): Promise<SearchRegistrationByPlateResponse> => {
  const response = await api.post<SearchRegistrationByPlateResponse>(
    '/api/v1/vehicle/get-vehicle-by-plate-exit',
    data
  );
  return response.data;
};
