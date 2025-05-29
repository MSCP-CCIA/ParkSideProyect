/**
 * Servicio para registrar un nuevo vehículo en el sistema.
 */

import api from '../api/axiosConfig';
import { CreateVehicleRequest } from '@/models/vehicle_models';
import { Message } from '@/models/message_models';

/**
 * Envía una solicitud para registrar un vehículo.
 * 
 * @param data - Datos necesarios para crear el vehículo.
 * @returns Una promesa que resuelve un objeto Message con la respuesta del servidor.
 */
export const addVehicle = async (
  data: CreateVehicleRequest
): Promise<Message> => {
  const response = await api.post<Message>('/api/v1/vehicle/register-vehicle', data);
  return response.data;
};
