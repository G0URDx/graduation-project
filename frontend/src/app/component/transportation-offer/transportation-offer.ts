import { Cargo } from "../cargo/cargo";
import { Client } from "../client/client";

export interface TransportationOffer {
    id_offer: Number;
    date_offer: Date;
    nameManager: String;
    client: Client;
    cargo: Cargo;
    freight_transportation_offer: Number;
    hasOrder?: boolean;
}
