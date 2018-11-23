import { Injectable } from "@angular/core";
import { IUzivatel } from "../models/uzivatel.model";

@Injectable()
export class SessionStorageService {
    private uzivatelKey = "current-user";

    GetCurrentUser() : IUzivatel {
        var user = JSON.parse(sessionStorage.getItem(this.uzivatelKey));
        return user;
    }

    SetCurrentUser(uzivatel : IUzivatel) : void {
        sessionStorage.setItem(this.uzivatelKey, JSON.stringify(uzivatel));
    }
}