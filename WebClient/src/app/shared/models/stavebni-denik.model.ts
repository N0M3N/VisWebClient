import { IZakazka } from "./zakazka.model";
import { IUzivatel } from "./uzivatel.model";

export interface IStavebniDenik {
    Id: number;
    Zakazka: IZakazka;
    Zamestnanec: IUzivatel;
    Datum: string;
    Popis: string;
}