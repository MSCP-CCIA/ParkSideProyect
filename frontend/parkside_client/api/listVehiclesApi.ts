import api from '../api/axiosConfig';
import {SearchCustomerVehiclesRequest, SearchVehiclesResponse} from '../models/vehicle_models'

export const listVehicles  = async (
    data: SearchCustomerVehiclesRequest
): Promise<SearchVehiclesResponse> => {
    const response = await api.post<SearchVehiclesResponse>('/api/v1/vehicle/get-customer-vehicles', data);
    return response.data;
};
