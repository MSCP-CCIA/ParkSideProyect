import api from '../api/axiosConfig';
import {
  SearchOccupationReportRequest,
  SearchOccupationReportResponse,
} from '@/models/reporteOcupacionModels';

export const getReporteOcupacion = async (
  data: SearchOccupationReportRequest
): Promise<SearchOccupationReportResponse> => {
  const response = await api.post<SearchOccupationReportResponse>(
    '/api/v1/vehicle/get-occupation-report',
    data
  );
  return response.data;
};
