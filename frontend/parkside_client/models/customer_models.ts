export interface CreateCustomerRequest {
  id: number;
  fullName: string;
  email: string;
  documentType: string;
  password: string;
  isActive: boolean;
  parkingId: number;
}

export interface UpdateCustomerRequest {
  id: number;
  fullName: string;
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
  fullName: string;
  email: string;
  passwordHash: string;
}