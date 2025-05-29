/**
 * Servicio para eliminar un vehículo registrado.
 */

import api from '../api/axiosConfig';
import { DeleteVehicleRequest } from '@/models/vehicle_models';
import { Message } from '@/models/message_models';

/**
 * Envía una solicitud para eliminar un vehículo.
 * 
 * @param data - Datos necesarios para identificar el vehículo a eliminar.
 * @returns Una promesa que resuelve un objeto Message con la respuesta del servidor.
 */
export const deleteVehicle = async (
  data: DeleteVehicleRequest
): Promise<Message> => {
  const response = await api.delete<Message>('/api/v1/vehicle/delete-vehicle', { data });
  return response.data;
};
