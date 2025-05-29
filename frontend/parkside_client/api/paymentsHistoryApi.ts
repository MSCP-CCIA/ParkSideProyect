/**
 * Servicio para obtener el historial de movimientos de pagos de un cliente.
 */

import api from '../api/axiosConfig';
import { SearchMovementsHistoryRequest, SearchMovementsHistoryResponse } from '@/models/payments_models';

/**
 * Realiza una solicitud para obtener el historial de movimientos de pagos.
 *
 * @param data - Datos necesarios para identificar al cliente.
 * @returns Una promesa que resuelve un objeto SearchMovementsHistoryResponse con el historial de movimientos.
 */
export const paymentsHistory = async (
  data: SearchMovementsHistoryRequest
): Promise<SearchMovementsHistoryResponse> => {
  const response = await api.post<SearchMovementsHistoryResponse>('/api/v1/payment/get-movements-history', data);
  return response.data;
};
