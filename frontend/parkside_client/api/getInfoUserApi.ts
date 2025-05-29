/**
 * Servicio para obtener la información del usuario.
 */

import api from '../api/axiosConfig';
import { SearchMyInformationRequest, SearchMyInformationResponse } from '@/models/customer_models';

/**
 * Realiza una solicitud para obtener la información del usuario.
 *
 * @param data - Datos necesarios para identificar al usuario.
 * @returns Una promesa que resuelve un objeto SearchMyInformationResponse con la información del usuario.
 */
export const getInfoUser = async (
  data: SearchMyInformationRequest
): Promise<SearchMyInformationResponse> => {
  const response = await api.post<SearchMyInformationResponse>('/api/v1/customer/info', data);
  return response.data;
};
