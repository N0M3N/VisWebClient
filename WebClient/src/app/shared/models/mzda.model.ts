import { IUzivatel } from "./uzivatel.model";
import { IZakazka } from "./zakazka.model";

export interface IMzda {
    Id: number;
    Zamestnanec : IUzivatel,
    Zakazka: IZakazka,
    Sazba: number;
}