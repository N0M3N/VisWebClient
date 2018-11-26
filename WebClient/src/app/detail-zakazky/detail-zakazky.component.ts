import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZakazkaApiService } from '../shared/services/zakazka.service';
import { IZakazka } from '../shared/models/zakazka.model';
import { IStavebniDenik } from '../shared/models/stavebni-denik.model';
import { Observable } from 'rxjs';
import { StavebniDenikApiService } from '../shared/services/stavebni-denik.service';

@Component({
  selector: 'app-detail-zakazky',
  templateUrl: './detail-zakazky.component.html'
})
export class DetailZakazkyComponent implements OnInit {
  private zakazka: IZakazka;
  private zaznamyDeniku$: Observable<IStavebniDenik[]>;

  constructor(private route: ActivatedRoute,
    private zakazkaService: ZakazkaApiService,
    private stavebniDenikService: StavebniDenikApiService) 
  { 
    this.route.params.subscribe(x => {
      this.zakazkaService.getById(x.id).subscribe(y => {
        this.zakazka = y;
        this.zaznamyDeniku$ = this.stavebniDenikService.ZaznamyZakazky(this.zakazka);
      },
      e => {
        console.log(e);
      })
    });
  }

  ngOnInit() {
  }

}
