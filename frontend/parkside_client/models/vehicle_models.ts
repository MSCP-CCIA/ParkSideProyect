export interface CreateVehicleRequest {
  plate: string;
  type: string;
  customer_id: number;
}

export interface SearchVehicleRequest {
  plate: string;
  customer_id: number;
}

export interface SearchVehicleResponse {
  type: string;
  plate: string;
}

export interface SearchVehiclesRequest {
      vehicles: {
        type: string;
        plate: string;
    }[];
}

export interface SearchVehiclesResponse {
      vehicles: {
        type: string;
        plate: string;
    }[]; //  Use an array for the vehicles property
}
export interface DeleteVehicleRequest {
    customer_id: number;
    plate: string;
}
