export interface CreateCardRequest {
  cardNumber: number;
  fullNameCustomer: string;
  month: number;
  year: number;
  cvc: number;
  cardType: string;
  customerId: number;
}

export interface UpdateCardRequest {
  cardNumberHash: string;
  fullNameCustomer: string;
  month: number;
  year: number;
  cvc: number;
  cardType: string;
  customerId: number;
}

export interface CreateOrUpdateCardRequest {
  cardNumberHash: string;
  fullNameCustomer: string;
  cvcCodeHash: string;
  expirationDate: Date;
  cardType: string;
  customerId: number;
}

export interface SearchCardRequest {
  cardNumberHash: string;
  customerId: number;
}

export interface SearchCardResponse {
  cardNumberHash: string;
  fullNameCustomer: string;
  month: number;
  year: number;
}

export interface SearchCardsRequest {
  customerId: number;
}

export interface SearchCardsResponse {
  cards: SearchCardResponse[];
}

export interface DeleteCardRequest {
  cardNumberHash: string;
  customerId: number;
}