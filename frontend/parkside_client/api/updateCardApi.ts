import api from '../api/axiosConfig';
import {UpdateCardRequest} from '../models/card_models'
import {Message} from '../models/message_models'
export const updateCard  = async (
    data: UpdateCardRequest
): Promise<Message> => {
    const response = await api.post<Message>('/api/v1/cards/update-card', data);
    return response.data;
};