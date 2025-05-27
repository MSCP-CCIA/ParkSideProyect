import api from '../api/axiosConfig';
import { CreateHistoricalRateRequest } from '../Models/tarifaModels';

export const createTarifa = async (data: CreateHistoricalRateRequest) => {
  return await api.post('/api/v1/historicalRate/register-rate/', data);
};
