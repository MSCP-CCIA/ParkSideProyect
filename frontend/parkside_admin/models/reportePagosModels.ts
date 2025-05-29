export interface SearchPaymentReportRequest {
  employee_id: number;
  customer_id: number;
}

export interface SearchPaymentReport {
  customer_id: number;
  customer_full_name: string;
  date_created: string;
  transaction_amount: number;
  status: string;
}

export interface SearchPaymentReportResponse {
  payment_report: SearchPaymentReport[];
}