import { Injectable } from "@angular/core";
import { IUzivatel } from "../models/uzivatel.model";
import { Observable } from "rxjs";
import { IZakazka } from "../models/zakazka.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ZakazkaApiService {

    constructor(private http: HttpClient) { }
    
    public getAll(uzivatel: IUzivatel) : Observable<IZakazka[]> {
        return this.http.get<IZakazka[]>('http://localhost:3407/zakazka/' + uzivatel.Id);
    }
}