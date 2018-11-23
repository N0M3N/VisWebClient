import { Injectable } from "@angular/core";
import { IUzivatel } from "../models/uzivatel.model";

@Injectable()
export class SessionStorageService {
    private uzivatelKey = "current-user";

    GetCurrentUser() : IUzivatel {
        return JSON.parse(sessionStorage.getItem(this.uzivatelKey));
    }

    SetCurrentUser(uzivatel : IUzivatel) : void {
        sessionStorage.setItem(this.uzivatelKey, JSON.stringify(uzivatel));
    }
}