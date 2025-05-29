export interface SearchOccupationReportRequest {
  employee_id: number;
  plate: string;
}

export interface SearchOccupationReport {
  plate: string;
  customer_full_name: string;
  entry_date: string;
  entry_time: string;
  exit_date: string | null;
  exit_time: string | null;
}

export interface SearchOccupationReportResponse {
  occupation_report: SearchOccupationReport[];
}