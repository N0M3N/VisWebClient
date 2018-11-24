import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IZakazka } from '../shared/models/zakazka.model';
import { ZakazkaApiService } from '../shared/services/zakazka.service';
import { SessionStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-list-zakazek',
  templateUrl: './list-zakazek.component.html',
  styleUrls: ['./list-zakazek.component.less']
})
export class ListZakazekComponent implements OnInit {
  private zakazky$: Observable<IZakazka[]>;

  displayedColumns = [
    'Nazev',
    'Zakaznik',
    'Stavbyvedouci',
    'Adresa',
    'Deadline',
    'Stav'
  ]
  constructor(
    private route: ActivatedRoute,
    private zakazkaService: ZakazkaApiService,
    private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.route.params.subscribe(x => {
      this.zakazky$ = this.zakazkaService.getAll(this.sessionStorageService.GetCurrentUser());
    })
  }
}
