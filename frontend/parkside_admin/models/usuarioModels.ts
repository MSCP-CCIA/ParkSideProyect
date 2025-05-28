export interface SearchCustomerByIdRequest {
  employee_id: number;
  customer_id: number;
}

export interface SearchCustomersResponse {
  id: number;
  full_name: string;
  email: string;
  document_type: string;
  is_active: boolean;
}

export interface UpdateCustomerStateRequest {
  employee_id: number;
  customer_id: number;
}