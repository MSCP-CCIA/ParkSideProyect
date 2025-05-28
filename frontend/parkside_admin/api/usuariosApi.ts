import api from '../api/axiosConfig';
import {
  SearchCustomerByIdRequest,
  SearchCustomersResponse,
  UpdateCustomerStateRequest,
} from '@/models/usuarioModels';

export const getUsuarioPorId = async (
  data: SearchCustomerByIdRequest
): Promise<SearchCustomersResponse> => {
  const response = await api.post<SearchCustomersResponse>(
    '/api/v1/customer/get-customer-by-id/',
    data
  );
  return response.data;
};

export const updateEstadoUsuario = async (
  data: UpdateCustomerStateRequest
): Promise<void> => {
  await api.post('/api/v1/customer/update-customer-state/', data);
};
