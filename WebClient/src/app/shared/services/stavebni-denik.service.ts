import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IZakazka } from "../models/zakazka.model";
import { Observable } from "rxjs";
import { IStavebniDenik } from "../models/stavebni-denik.model";

@Injectable()
export class StavebniDenikApiService {
  constructor(private http: HttpClient){}

  public ZaznamyZakazky(zakazka: IZakazka) : Observable<IStavebniDenik[]>{
    return this.http.post<IStavebniDenik[]>("localhost:3407/stavebniDenik", zakazka);
  }

  PridatZaznam(zaznam: IStavebniDenik): Observable<IStavebniDenik> {
    return this.http.post<IStavebniDenik>("localhost:3407/stavebniDenik", zaznam);
  }
}