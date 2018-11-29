import { Injectable } from "@angular/core";
import { IUzivatel } from "../models/uzivatel.model";
import { IZakazka } from "../models/zakazka.model";

@Injectable()
export class SessionStorageService {
    private uzivatelKey = "current-user";
    private zakazkaKey = "current-zakazka";

    GetCurrentUser() : IUzivatel {
        var user = <IUzivatel> JSON.parse(sessionStorage.getItem(this.uzivatelKey));
        return user;
    }

    SetCurrentUser(uzivatel : IUzivatel) : void {
        sessionStorage.setItem(this.uzivatelKey, JSON.stringify(uzivatel));
    }

    GetLatestZakazka(id: number) : IZakazka {
        var zakazka = <IZakazka> JSON.parse(sessionStorage.getItem(this.getZakazkaKey(id)));
        return zakazka;
    }

    SetLatestZakazka(zakazka: IZakazka) : void {
        sessionStorage.setItem(this.getZakazkaKey(zakazka.Id), JSON.stringify(zakazka));
    }

    private getZakazkaKey(id: number) : string {
        return this.zakazkaKey + "-" + id;
    }
}