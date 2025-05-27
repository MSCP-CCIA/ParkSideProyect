import api from '../api/axiosConfig';
import {
  SearchParkingRequest,
  SearchParkingResponse,
} from '../Models/parkingModels';

export const getParking = async (
  data: SearchParkingRequest
): Promise<SearchParkingResponse> => {
  const response = await api.post<SearchParkingResponse>(
    '/api/v1/vehicle/get-parking',
    data
  );
  return response.data;
};
