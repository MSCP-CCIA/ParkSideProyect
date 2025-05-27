import api from '../api/axiosConfig';
import {
  SearchHistoricalRatesRequest,
  SearchHistoricalRatesResponse
} from '../Models/tarifaModels';

export const getTarifas = async (
  data: SearchHistoricalRatesRequest
): Promise<SearchHistoricalRatesResponse> => {
  const response = await api.post<SearchHistoricalRatesResponse>(
    '/api/v1/vehicle/get-all-rates',
    data
  );
  return response.data;
};
