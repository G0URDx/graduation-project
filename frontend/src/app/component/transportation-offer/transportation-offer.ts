import { Client } from "../client/client";

export interface TransportationOffer {
    id_offer: Number;
    date_offer: Date;
    client: Client;
    location_load_transportation_offer: String;
    location_unload_transportation_offer: String;
    freight_transportation_offer: Number;
}
