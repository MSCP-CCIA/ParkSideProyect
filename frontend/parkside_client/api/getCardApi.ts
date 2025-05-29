/**
 * Servicio para obtener información de una tarjeta específica.
 */

import api from '../api/axiosConfig';
import { SearchCardRequest, SearchCardResponse } from '@/models/card_models';

/**
 * Realiza una solicitud para obtener los datos de una tarjeta.
 *
 * @param data - Datos necesarios para buscar la tarjeta.
 * @returns Una promesa que resuelve un objeto SearchCardResponse con la información de la tarjeta.
 */
export const getCard = async (
  data: SearchCardRequest
): Promise<SearchCardResponse> => {
  const response = await api.post<SearchCardResponse>('/api/v1/cards/get-card', data);
  return response.data;
};
