import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KalkulaceApiService } from '../shared/services/kalkulace.service';
import { IKalkulace } from '../shared/models/kalkulace.model';
import { SessionStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-kalkulace',
  templateUrl: './kalkulace.component.html'
})
export class KalkulaceComponent implements OnInit {
  private kalkulace: IKalkulace;

  constructor(private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private kalkuaceService: KalkulaceApiService,) 
    {
      this.route.params.subscribe(x => {
        var kalkSubs = this.kalkuaceService.Kalkulace(this.sessionStorageService.GetLatestZakazka(x.id)).subscribe(y => {
          this.kalkulace = y;
        },
          e => console.log(e),
          () => kalkSubs.unsubscribe());
      });
     }

  ngOnInit() {
  }
}
