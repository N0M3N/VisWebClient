import { IZakazka } from "./zakazka.model";
import { IUzivatel } from "./uzivatel.model";

export interface IKalkulace {
  Zakazka : IZakazka;
  MzdoveNaklady: IMzdoveNaklady[];
  CelkoveMzdy: number;
}

export interface IMzdoveNaklady {
  Zamestnanec: IUzivatel;
  Dochazka: IZaznamDochazky[];
  Sazaba: number;
  CelkemHodin: number;
  Mzda: number;
}

export interface IZaznamDochazky {
  OdpracovanychHodin: number;
  Datum: string;
}