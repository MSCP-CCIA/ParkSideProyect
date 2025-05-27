import api from '../api/axiosConfig';
import {
  SearchRegistrationByPlateRequest,
  SearchRegistrationByPlateResponse
} from '../Models/registroEntradaModels';

export const getRegistroEntrada = async (
  data: SearchRegistrationByPlateRequest
): Promise<SearchRegistrationByPlateResponse> => {
  const response = await api.post<SearchRegistrationByPlateResponse>(
    '/api/v1/vehicle/get-vehicle-by-plate-entry',
    data
  );
  return response.data;
};
