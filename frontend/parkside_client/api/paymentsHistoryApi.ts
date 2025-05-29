import api from '../api/axiosConfig';
import {SearchMovementsHistoryRequest} from '../models/payments_models'
import {SearchMovementsHistoryResponse} from '../models/payments_models'
export const paymentsHistory  = async (
    data: SearchMovementsHistoryRequest
): Promise<SearchMovementsHistoryResponse> => {
    const response = await api.post<SearchMovementsHistoryResponse>('/api/v1/payment/get-movements-history', data);
    return response.data;
};