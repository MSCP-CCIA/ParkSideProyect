import api from '../api/axiosConfig';
import {SearchCustomerRequest, SearchCustomerResponse} from '../models/customer_models';
export const loginCustomer  = async (
    data: SearchCustomerRequest
): Promise<SearchCustomerResponse> => {
    const response = await api.post<SearchCustomerResponse>('/api/v1/customer/login/', data);
    return response.data;
};
