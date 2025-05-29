export interface SearchMovementsHistoryRequest {
  customer_id: number;
}
export interface SearchMovementsHistory {
  date_approved: string;
  plate: string;
  payment: number;
}
export interface SearchMovementsHistoryResponse {
  movements: SearchMovementsHistory[];
}