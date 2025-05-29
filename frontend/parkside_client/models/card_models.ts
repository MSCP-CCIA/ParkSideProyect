/**
 * @interface CreateCardRequest
 * @description Representa la solicitud para crear una nueva tarjeta.
 */
export interface CreateCardRequest {
    card_number: number;
    full_name_customer: string;
    month: number;
    year: number;
    cvc: number;
    card_type: string;
    customer_id: number;
}

/**
 * @interface SearchCardRequest
 * @description Representa la solicitud para buscar una tarjeta específica de un cliente.
 */
export interface SearchCardRequest {
    last_four_digits: number;
    customer_id: number;
}

/**
 * @interface SearchCardResponse
 * @description Representa la respuesta de la búsqueda de una tarjeta específica.
 */
export interface SearchCardResponse {
    last_four_digits: number;
    card_type: string;
    full_name_customer: string;
    expiration_date: string; // Formato de fecha como string, por ejemplo "MM/AA" o "YYYY-MM-DD"
}

/**
 * @interface SearchCardsRequest
 * @description Representa la solicitud para buscar todas las tarjetas de un cliente.
 */
export interface SearchCardsRequest {
    customer_id: number;
}

/**
 * @interface SearchCard
 * @description Representa un resumen de una tarjeta para listas.
 */
export interface SearchCard {
    last_four_digits: number;
    card_type: string;
}

/**
 * @interface SearchCardsResponse
 * @description Representa la respuesta de la búsqueda de todas las tarjetas de un cliente.
 */
export interface SearchCardsResponse {
    cards: SearchCard[]; // Un array de objetos SearchCard
}

/**
 * @interface UpdateCardRequest
 * @description Representa la solicitud para actualizar la información de una tarjeta.
 */
export interface UpdateCardRequest {
    last_four_digits: number;
    full_name_customer: string;
    month: number;
    year: number;
    cvc: number;
    customer_id: number;
}

/**
 * @interface DeleteCardRequest
 * @description Representa la solicitud para eliminar una tarjeta de un cliente.
 */
export interface DeleteCardRequest {
    last_four_digits: number;
    customer_id: number;
}
