import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IZakazka } from '../shared/models/zakazka.model';
import { IStavebniDenik } from '../shared/models/stavebni-denik.model';
import { Observable, Subscription } from 'rxjs';
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
}
