import api from '../api/axiosConfig';
import {SearchCardsRequest, SearchCardsResponse} from '../models/card_models'

export const listCards  = async (
    data: SearchCardsRequest
): Promise<SearchCardsResponse> => {
    const response = await api.post<SearchCardsResponse>('/api/v1/cards/get-cards', data);
    return response.data;
};
