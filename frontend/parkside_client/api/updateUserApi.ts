import api from '../api/axiosConfig';
import {UpdateCustomerRequest} from '../models/customer_models'
import {Message} from '../models/message_models'
export const updateUser  = async (
    data: UpdateCustomerRequest
): Promise<Message> => {
    const response = await api.post<Message>('/api/v1/customer/update-customer', data);
    return response.data;
};