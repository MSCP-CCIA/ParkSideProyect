export interface SearchAllCustomerVehiclesRequest {
    employee_id: number;
    customer_id: number;
}

export interface SearchAllCustomerVehicles {
    customer_id: number;
    full_name: string;
    vehicle_type: string;
    email: string;
    plate: string;
}

export interface SearchAllCustomerVehiclesResponse {
    vehicles: SearchAllCustomerVehicles[];
}