/**
 * Servicio para obtener la lista de vehículos asociados a un cliente.
 */

import api from '../api/axiosConfig';
import { SearchCustomerVehiclesRequest, SearchVehiclesResponse } from '@/models/vehicle_models';

/**
 * Realiza una solicitud para obtener los vehículos de un cliente.
 *
 * @param data - Datos necesarios para identificar al cliente.
 * @returns Una promesa que resuelve un objeto SearchVehiclesResponse con la lista de vehículos.
 */
export const listVehicles = async (
  data: SearchCustomerVehiclesRequest
): Promise<SearchVehiclesResponse> => {
  const response = await api.post<SearchVehiclesResponse>('/api/v1/vehicle/get-customer-vehicles', data);
  return response.data;
};
