import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KalkulaceApiService } from '../shared/services/kalkulace.service';
import { ZakazkaApiService } from '../shared/services/zakazka.service';
import { Subscription } from 'rxjs';
import { IKalkulace } from '../shared/models/kalkulace.model';

@Component({
  selector: 'app-kalkulace',
  templateUrl: './kalkulace.component.html'
})
export class KalkulaceComponent implements OnInit, OnDestroy {
  private kalkulace: IKalkulace;

  private zakazkaSubscription: Subscription;
  private routeSubscription: Subscription;
  private kalkulaceSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private kalkuaceService: KalkulaceApiService,
    private zakazkaService: ZakazkaApiService) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(x => {
      this.zakazkaSubscription = this.zakazkaService.getById(x.id).subscribe(y => {
        this.kalkulaceSubscription = this.kalkuaceService.Kalkulace(y).subscribe(z => {
          this.kalkulace = z;
          console.log(z);
        })
      }, 
      e => {
        console.log(e);
      },
      () => this.kalkulaceSubscription.unsubscribe());  
    },
    e => {
      console.log(e);
    },
    () => this.zakazkaSubscription.unsubscribe());
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
