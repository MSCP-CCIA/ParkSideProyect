export interface SearchParkingRequest {
  employee_id: number;
}

export interface SearchParkingResponse {
  name: string;
  address: string;
  enterprise: string;
}
