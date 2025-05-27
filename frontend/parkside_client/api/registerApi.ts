import api from '../api/axiosConfig';
import {CreateCustomerRequest} from '../models/customer_models';
import {Message} from '../models/message_models'

export const registerCustomer  = async (
    data: CreateCustomerRequest
): Promise<Message> => {
    const response = await api.post<Message>('/api/v1/customer/register/', data);
    return response.data;
};