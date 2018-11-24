import { IZakazka } from "./zakazka.model";
import { IUzivatel } from "./uzivatel.model";

export interface IStavebniDenik {
    Id: number;
    Zakazka: IZakazka;
    Zamestnanec: IUzivatel;
    Datum: Date;
    Popis: string;
}