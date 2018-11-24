import { IZakazka } from "./zakazka.model";
import { IUzivatel } from "./uzivatel.model";
import { Time } from "@angular/common";

export interface IDochazka {
    Id: number;
    Zakazka: IZakazka;
    Zamestnanec: IUzivatel;
    Datum: string;
    Prichod: Time;
    Odchod: Time;
}