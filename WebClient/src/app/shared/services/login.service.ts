import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUzivatel } from "../models/uzivatel.model";
import { Observable } from "rxjs";
import { LoginModel } from "../models/login.model";

@Injectable()
export class LoginApiService {
    constructor(private http: HttpClient) { }

    public login(login: LoginModel) : Observable<IUzivatel> {
        return this.http.post<IUzivatel>('http://localhost:3407/login', login);
    }
}