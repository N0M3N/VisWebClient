import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IZakazka } from '../shared/models/zakazka.model';
import { IStavebniDenik } from '../shared/models/stavebni-denik.model';
import { Observable } from 'rxjs';
import { StavebniDenikApiService } from '../shared/services/stavebni-denik.service';
import { SessionStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-detail-zakazky',
  templateUrl: './detail-zakazky.component.html'
})
export class DetailZakazkyComponent implements OnInit {
  private zakazka: IZakazka;
  private zaznamyDeniku$: Observable<IStavebniDenik[]>;

  constructor(private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private stavebniDenikService: StavebniDenikApiService) 
  {  
    this.route.params.subscribe(x => {
      this.zakazka = this.sessionStorageService.GetLatestZakazka(x.id);
      this.zaznamyDeniku$ = this.stavebniDenikService.ZaznamyZakazky(this.zakazka);
    },
    e => console.log(e));
  }

  ngOnInit() {   
  }

  getAddress() : string {
    var address =  this.zakazka.Adresa;
    var replaced = address.replace(" ", "+");
    while(address != replaced){
      address = replaced;
      replaced = address.replace(" ", "+");
      console.log(address);
    }
    return "https://www.google.com/maps/embed/v1/place?key=AIzaSyB5kLf_05mqPl8ADD3jBAOBIzxhuWxeNtA&q=" + address; 
  }
}
