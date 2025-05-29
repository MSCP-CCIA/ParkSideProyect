/**
 * Servicio para eliminar una tarjeta registrada.
 */

import api from '../api/axiosConfig';
import { DeleteCardRequest } from '@/models/card_models';
import { Message } from '@/models/message_models';

/**
 * Envía una solicitud para eliminar una tarjeta.
 * 
 * @param data - Datos necesarios para identificar la tarjeta a eliminar.
 * @returns Una promesa que resuelve un objeto Message con la respuesta del servidor.
 */
export const deleteCard = async (
  data: DeleteCardRequest
): Promise<Message> => {
  const response = await api.delete<Message>('/api/v1/cards/delete-card', { data });
  return response.data;
};
