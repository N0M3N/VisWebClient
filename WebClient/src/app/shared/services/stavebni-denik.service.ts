import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IZakazka } from "../models/zakazka.model";
import { Observable } from "rxjs";
import { IStavebniDenik } from "../models/stavebni-denik.model";
import { StavebniDenikPostModel } from "../models/stavebni-denik-post.model";

@Injectable()
export class StavebniDenikApiService {
  constructor(private http: HttpClient){}
  
  private headerDict = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  public ZaznamyZakazky(zakazka: IZakazka) : Observable<IStavebniDenik[]>{
    return this.http.get<IStavebniDenik[]>('http://localhost:3407/stavebniDenik/zakazka/' + zakazka.Id);
  }

  PridatZaznam(zaznam: StavebniDenikPostModel): Observable<IStavebniDenik> {
    return this.http.put<IStavebniDenik>('http://localhost:3407/stavebniDenik/', zaznam);
  }
}