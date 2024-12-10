import { Client } from "../client/client";
import { TransportationOffer } from "../transportation-offer/transportation-offer";

export interface Order {
    id_order: Number;
    client: Client;
    transportationOffer: TransportationOffer;
    id_client_order: String;
    payment_terms_order: String;
    freight_order: Number;
    account_currency_order: String;
    payment_currency_order: String;
    description_order: String;
}
