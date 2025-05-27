import api from '../api/axiosConfig';
import {
    SearchAllCustomerVehiclesRequest,
    SearchAllCustomerVehiclesResponse,
} from '../Models/vehicleModels';

export const getAllCustomerVehicles = async (
    data: SearchAllCustomerVehiclesRequest
): Promise<SearchAllCustomerVehiclesResponse> => {
    const response = await api.post<SearchAllCustomerVehiclesResponse>(
        '/api/v1/vehicle/get-all-customers-vehicles',
        data
    );
    return response.data;
};
