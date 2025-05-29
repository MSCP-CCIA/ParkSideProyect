import api from '../api/axiosConfig';
import {DeleteCardRequest} from '../models/card_models'
import {Message} from '../models/message_models'
export const deleteCard  = async (
    data: DeleteCardRequest
): Promise<Message> => {
    const response = await api.delete<Message>('/api/v1/cards/delete-card', {data});
    return response.data;
};