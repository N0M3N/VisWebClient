import { IUzivatel } from "./uzivatel.model";

export interface IZakazka {
    Nazev : string;
    Zakaznik: IUzivatel;
    ZodpovednyZamestnanec: IUzivatel;
    Stav: string;
    Adresa: string;
    Deadline: string;    
}