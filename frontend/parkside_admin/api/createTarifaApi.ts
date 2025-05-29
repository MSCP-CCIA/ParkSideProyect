import api from '../api/axiosConfig';
import { CreateHistoricalRateRequest } from '@/models/tarifaModels';

export const createTarifaApi = async (data: CreateHistoricalRateRequest) => {
  return await api.post('/api/v1/historicalRate/register-rate', data);
};
