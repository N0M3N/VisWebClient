import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IZakazka } from '../shared/models/zakazka.model';
import { ZakazkaApiService } from '../shared/services/zakazka.service';
import { SessionStorageService } from '../shared/services/local-storage.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-list-zakazek',
  templateUrl: './list-zakazek.component.html'
})
export class ListZakazekComponent implements OnInit, OnDestroy {
  private zakazky$: Observable<IZakazka[]>;
  private selection: SelectionModel<IZakazka>;
  private nextPage: string;
  private displayedColumns = [
    'select',
    'Nazev',
    'Zakaznik',
    'Stavbyvedouci',
    'Adresa',
    'Deadline',
    'Stav'
  ];

  private routerSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private zakazkaService: ZakazkaApiService,
    private sessionStorageService: SessionStorageService) 
  { }

  ngOnInit() {    
    this.routerSubscription = this.route.params.subscribe(x => {
      this.zakazky$ = this.zakazkaService.getAll(this.sessionStorageService.GetCurrentUser());
      this.selection = new SelectionModel<IZakazka>(false, [], true);
      this.nextPage = x.next;
    });
  }

  getUrl(){
    var zakazka = this.selection.selected[0];
    this.sessionStorageService.SetLatestZakazka(zakazka);
    return "/" + this.nextPage + "/" + zakazka.Id;
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
