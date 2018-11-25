import { Component, OnInit, Input } from '@angular/core';
import { IZakazka } from '../shared/models/zakazka.model';
import { Observable } from 'rxjs';
import { IStavebniDenik } from '../shared/models/stavebni-denik.model';
import { StavebniDenikApiService } from '../shared/services/stavebni-denik.service';

@Component({
  selector: 'app-stavebni-denik',
  templateUrl: './stavebni-denik.component.html'
})
export class StavebniDenikComponent implements OnInit {
  @Input() zakazka : IZakazka;
  private zaznamy$: Observable<IStavebniDenik[]>;
  private displayedColumns: string[] = [
    'Datum',
    'Zamestnanec',
    'Popis'
  ]

  constructor(private stavebniDenikService: StavebniDenikApiService) { }

  ngOnInit() {
    this.zaznamy$ = this.stavebniDenikService.ZaznamyZakazky(this.zakazka);
  }

}
