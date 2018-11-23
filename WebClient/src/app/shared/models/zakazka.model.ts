import { IUzivatel } from "./uzivatel.model";

export interface IZakazka {
    nazev : string;
    zakaznik: IUzivatel;
    zodpovednyZamestnanec: IUzivatel;
    stav: string;
    adresa: string;
    deadline: string;    
}