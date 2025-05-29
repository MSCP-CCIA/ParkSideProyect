/**
 * Servicio para registrar una nueva tarjeta en el sistema.
 */

import api from '../api/axiosConfig';
import { CreateCardRequest } from '@/models/card_models';
import { Message } from '@/models/message_models';

/**
 * Envía una solicitud para registrar una nueva tarjeta.
 *
 * @param data - Datos necesarios para crear la tarjeta.
 * @returns Una promesa que resuelve un objeto Message con la respuesta del servidor.
 */
export const addCard = async (
  data: CreateCardRequest
): Promise<Message> => {
  const response = await api.post<Message>('/api/v1/cards/register-card', data);
  return response.data;
};
