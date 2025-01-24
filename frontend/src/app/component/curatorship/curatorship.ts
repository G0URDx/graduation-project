import { Client } from "../client/client";

export interface Curatorship {
    id_curatorship?: Number;
    nameManager: String;
    client: Client;
    status_curatorship: String;
}
