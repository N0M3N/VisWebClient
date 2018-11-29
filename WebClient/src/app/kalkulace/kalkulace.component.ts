import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KalkulaceApiService } from '../shared/services/kalkulace.service';
import { ZakazkaApiService } from '../shared/services/zakazka.service';
import { Subscription } from 'rxjs';
import { IKalkulace } from '../shared/models/kalkulace.model';
import { SessionStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-kalkulace',
  templateUrl: './kalkulace.component.html'
})
export class KalkulaceComponent implements OnInit, OnDestroy {
  private kalkulace: IKalkulace;

  private routeSubscription: Subscription;
  private kalkulaceSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private kalkuaceService: KalkulaceApiService,) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(x => {
      this.kalkuaceService.Kalkulace(this.sessionStorageService.GetLatestZakazka(x.id)).subscribe(y => {
        this.kalkulace = y;
      },
        e => console.log(e));
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.kalkulaceSubscription.unsubscribe();
  }
}
