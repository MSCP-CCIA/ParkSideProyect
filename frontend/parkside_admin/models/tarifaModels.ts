export interface SearchHistoricalRatesRequest {
  employee_id: number;
}

export interface SearchHistoricalRateResponse {
  car_rate: number;
  motorbike_rate: number;
  start_date: string;
  end_date: string | null;
}

export interface SearchHistoricalRatesResponse {
  historicalRates: SearchHistoricalRateResponse[];
}

export interface CreateHistoricalRateRequest {
  employee_id: number;
  car_rate: number;
  motorbike_rate: number;
  start_date: string;
}

/*
export interface CreateHistoricalRateResponse {
  car_rate: number;
  motorbike_rate: number;
  start_date: string;
}
 */