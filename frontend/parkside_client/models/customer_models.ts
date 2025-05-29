export interface CreateCustomerRequest {
  id: number;
  full_name: string;
  email: string;
  document_type: string;
  password: string;
  is_active: boolean;
  parking_id: number;
}

export interface UpdateCustomerRequest {
  id: number;
  full_name: string;
}

export interface SearchCustomerRequest {
  email: string;
  password: string;
}

export interface SearchCustomerResponse {
  id: number;
  token: string;
}

export interface SearchMyInformationRequest {
  id: number;
}

export interface SearchMyInformationResponse {
  id: number;
  document_type: string;
  full_name: string;
  email: string;
}