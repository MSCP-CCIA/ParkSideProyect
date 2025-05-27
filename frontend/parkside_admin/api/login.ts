import api from '../api/axiosConfig';
import {SearchEmployeeRequest, SearchEmployeeResponse} from '../Models/loginModels';

export const loginEmployee = async (
    data: SearchEmployeeRequest
): Promise<SearchEmployeeResponse> => {
    const response = await api.post<SearchEmployeeResponse>('/api/v1/employee/login/', data);
    return response.data;
};
