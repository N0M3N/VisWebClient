import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZakazkaApiService } from '../shared/services/zakazka.service';
import { IZakazka } from '../shared/models/zakazka.model';

@Component({
  selector: 'app-detail-zakazky',
  templateUrl: './detail-zakazky.component.html'
})
export class DetailZakazkyComponent implements OnInit {
  private zakazka: IZakazka;

  constructor(private route: ActivatedRoute,
    private zakazkaService: ZakazkaApiService) 
  { 
    this.route.params.subscribe(x => {
      this.zakazkaService.getById(x.id).subscribe(y => {
        this.zakazka = y;
      },
      e => {
        console.log(e);
      })
    });    
  }

  ngOnInit() {
  }

}
