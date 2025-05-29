import api from '../api/axiosConfig';
import { UpdateEmployeeRequest } from '@/models/editarPerfilModels';

export const updatePerfil = async (data: UpdateEmployeeRequest): Promise<void> => {
  await api.post('/api/v1/employee/update-employee', data);
};
