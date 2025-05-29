import api from '../api/axiosConfig';
import {
  SearchParkingRequest,
  SearchParkingResponse,
} from '@/models/parkingModels';

export const getParkingApi = async (
  data: SearchParkingRequest
): Promise<SearchParkingResponse> => {
  const response = await api.post<SearchParkingResponse>(
    '/api/v1/parking/get-parking',
    data
  );
  return response.data;
};
