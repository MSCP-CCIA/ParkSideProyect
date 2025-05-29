/**
 * Servicio para registrar un nuevo cliente.
 */

import api from '../api/axiosConfig';
import { CreateCustomerRequest } from '@/models/customer_models';
import { Message } from '@/models/message_models';

/**
 * Envía una solicitud para registrar un cliente nuevo.
 *
 * @param data - Datos necesarios para crear el cliente.
 * @returns Una promesa que resuelve un objeto Message con la respuesta del servidor.
 */
export const registerCustomer = async (
  data: CreateCustomerRequest
): Promise<Message> => {
  const response = await api.post<Message>('/api/v1/customer/register', data);
  return response.data;
};
