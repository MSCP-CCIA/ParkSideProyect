import api from '../api/axiosConfig';
import {SearchMyInformationRequest} from '../models/customer_models'
import {SearchMyInformationResponse} from '../models/customer_models'
export const getInfoUser  = async (
    data: SearchMyInformationRequest
): Promise<SearchMyInformationResponse> => {
    const response = await api.post<SearchMyInformationResponse>('/api/v1/customer/info', data);
    return response.data;
};