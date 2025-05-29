export interface SearchRegistrationByPlateRequest {
  employee_id: number;
  plate: string;
}

export interface SearchRegistrationByPlateResponse {
  customer_id: number;
  customer_full_name: string;
  vehicle_type: string;
  customer_email: string;
  vehicle_plate: string;
}
