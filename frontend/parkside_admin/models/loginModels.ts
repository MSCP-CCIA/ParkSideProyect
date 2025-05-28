export interface SearchEmployeeRequest {
    email: string;
    password: string;
}

export interface SearchEmployeeResponse {
    id: number;
    token: string;
}
