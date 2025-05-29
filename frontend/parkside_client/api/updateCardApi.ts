/**
 * Servicio para actualizar la información de una tarjeta.
 */

import api from '../api/axiosConfig';
import { UpdateCardRequest } from '@/models/card_models';
import { Message } from '@/models/message_models';

/**
 * Envía una solicitud para actualizar una tarjeta existente.
 *
 * @param data - Datos necesarios para actualizar la tarjeta.
 * @returns Una promesa que resuelve un objeto Message con la respuesta del servidor.
 */
export const updateCard = async (
  data: UpdateCardRequest
): Promise<Message> => {
  const response = await api.post<Message>('/api/v1/cards/update-card', data);
  return response.data;
};
