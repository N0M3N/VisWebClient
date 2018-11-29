import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IKalkulace } from "../models/kalkulace.model";
import { Observable } from "rxjs";
import { IZakazka } from "../models/zakazka.model";

@Injectable()
export class KalkulaceApiService {
  constructor(private http: HttpClient) { }

  public Kalkulace(zakazka: IZakazka) : Observable<IKalkulace> {
    return this.http.get<IKalkulace>('http://localhost:3407/kalkulace/' + zakazka.Id);
  }
}