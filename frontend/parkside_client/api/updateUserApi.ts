/**
 * Servicio para actualizar la información de un cliente.
 */

import api from '../api/axiosConfig';
import { UpdateCustomerRequest } from '@/models/customer_models';
import { Message } from '@/models/message_models';

/**
 * Envía una solicitud para actualizar los datos de un cliente existente.
 *
 * @param data - Datos necesarios para actualizar el cliente.
 * @returns Una promesa que resuelve un objeto Message con la respuesta del servidor.
 */
export const updateUser = async (
  data: UpdateCustomerRequest
): Promise<Message> => {
  const response = await api.post<Message>('/api/v1/customer/update-customer', data);
  return response.data;
};
