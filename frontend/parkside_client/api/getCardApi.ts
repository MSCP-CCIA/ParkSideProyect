import api from '../api/axiosConfig';
import {SearchCardRequest} from '../models/card_models'
import {SearchCardResponse} from '../models/card_models'
export const getCard  = async (
    data: SearchCardRequest
): Promise<SearchCardResponse> => {
    const response = await api.post<SearchCardResponse>('/api/v1/cards/get-card', data);
    return response.data;
};