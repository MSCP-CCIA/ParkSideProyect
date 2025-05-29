/**
 * Servicio para obtener la lista de tarjetas asociadas a un usuario.
 */

import api from '../api/axiosConfig';
import { SearchCardsRequest, SearchCardsResponse } from '@/models/card_models';

/**
 * Realiza una solicitud para obtener las tarjetas del usuario.
 *
 * @param data - Datos necesarios para filtrar las tarjetas.
 * @returns Una promesa que resuelve un objeto SearchCardsResponse con la lista de tarjetas.
 */
export const listCards = async (
  data: SearchCardsRequest
): Promise<SearchCardsResponse> => {
  const response = await api.post<SearchCardsResponse>('/api/v1/cards/get-cards', data);
  return response.data;
};
