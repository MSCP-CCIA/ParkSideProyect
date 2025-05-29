import api from '../api/axiosConfig';
import {
  SearchHistoricalRatesRequest,
  SearchHistoricalRatesResponse
} from '@/models/tarifaModels';

export const getTarifasApi = async (
  data: SearchHistoricalRatesRequest
): Promise<SearchHistoricalRatesResponse> => {
  const response = await api.post<SearchHistoricalRatesResponse>(
    '/api/v1/historicalRate/get-all',
    data
  );
  return response.data;
};
