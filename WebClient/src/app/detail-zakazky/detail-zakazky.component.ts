import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class DetailZakazkyComponent implements OnInit, OnDestroy {
  private zakazka: IZakazka;
  private zaznamyDeniku$: Observable<IStavebniDenik[]>;

  private routerSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private stavebniDenikService: StavebniDenikApiService) 
  { }

  ngOnInit() {    
    this.routerSubscription = this.route.params.subscribe(x => {
      this.zakazka = this.sessionStorageService.GetLatestZakazka(x.id);
      this.zaznamyDeniku$ = this.stavebniDenikService.ZaznamyZakazky(this.zakazka);
    },
    e => console.log(e));
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
