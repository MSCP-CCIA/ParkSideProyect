import api from '../api/axiosConfig';
import {CreateCardRequest} from '../models/card_models'
import {Message} from '../models/message_models'
export const addCard  = async (
    data: CreateCardRequest
): Promise<Message> => {
    const response = await api.post<Message>('/api/v1/cards/register-card', data);
    return response.data;
};