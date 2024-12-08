import { Customs } from "../customs/customs";
import { Recipient } from "../recipient/recipient";
import { Sender } from "../sender/sender";

export interface Cargo {
    id_cargo: Number;
    name_cargo: String;
    ldm_cargo: Number;
    price_cargo: Number;
    gross_cargo: Number;
    max_height_cargo: Number;
    size_cargo: String;
    quantity_cargo: Number;
    danger_cargo: Boolean;
    sender: Sender;
    location_load_cargo: String;
    date_load_cargo: Date;
    customs: Customs;
    date_customs_cargo: Date;
    recipient: Recipient;
    location_unload_cargo: String;
    date_unload_cargo: Date;
}
