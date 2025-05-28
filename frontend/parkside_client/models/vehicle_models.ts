export interface CreateVehicleRequest {
  plate: string;
  type: string;
  customer_id: number;
}

export interface SearchCustomerVehicleRequest {
  plate: string;
  customer_id: number;
}

export interface SearchCustomerVehicleResponse {
  type: string;
  plate: string;
}

export interface SearchCustomerVehiclesRequest {
  customer_id: number;
}

export interface SearchVehiclesResponse {
  vehicles: SearchCustomerVehicleResponse[];
}

export interface DeleteVehicleRequest {
  customer_id: number;
  plate: string;
}