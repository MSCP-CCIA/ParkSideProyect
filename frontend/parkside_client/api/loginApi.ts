/**
 * Servicio para iniciar sesión de un cliente.
 */

import api from '../api/axiosConfig';
import { SearchCustomerRequest, SearchCustomerResponse } from '@/models/customer_models';

/**
 * Realiza una solicitud para autenticar un cliente.
 *
 * @param data - Credenciales del cliente para el inicio de sesión.
 * @returns Una promesa que resuelve un objeto SearchCustomerResponse con la información del cliente.
 */
export const loginCustomer = async (
  data: SearchCustomerRequest
): Promise<SearchCustomerResponse> => {
  const response = await api.post<SearchCustomerResponse>('/api/v1/customer/login', data);
  return response.data;
};
