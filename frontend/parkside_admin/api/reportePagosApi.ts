import api from '../api/axiosConfig';
import {
  SearchPaymentReportRequest,
  SearchPaymentReportResponse,
} from '@/models/reportePagosModels';

export const getReportePagos = async (
  data: SearchPaymentReportRequest
): Promise<SearchPaymentReportResponse> => {
  const response = await api.post<SearchPaymentReportResponse>(
    '/api/v1/payment/get-payment-report',
    data
  );
  return response.data;
};