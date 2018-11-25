import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IZakazka } from '../shared/models/zakazka.model';
import { ActivatedRoute } from '@angular/router';
import { ZakazkaApiService } from '../shared/services/zakazka.service';
import { StavebniDenikApiService } from '../shared/services/stavebni-denik.service';
import { IStavebniDenik } from '../shared/models/stavebni-denik.model';
import { SessionStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-stavebni-denik-form',
  templateUrl: './stavebni-denik-form.component.html'
})
export class StavebniDenikFormComponent implements OnInit {
  private stavebniDenikForm: FormGroup;
  private zakazka: IZakazka;

  constructor(
    private route: ActivatedRoute,
    private zakazkaService: ZakazkaApiService,
    private stavebniDenikService: StavebniDenikApiService,
    private sessionStorageService: SessionStorageService,
    private fb: FormBuilder
  ) {
    route.params.subscribe(x => {
      zakazkaService.getById(x.id).subscribe(y =>{
        this.zakazka = y
      },
      e => {
        console.log(e);
      });
    });
    this.stavebniDenikForm = this.fb.group({
      datum: new FormControl(new Date(Date.now()), Validators.required),
      popis: new FormControl("", Validators.required)});
  }

  ngOnInit() {
  }

  controlValid(controlName: string) : boolean {
    var control = this.stavebniDenikForm.controls[controlName];
    return !control.valid && (control.touched || control.dirty);
  }

  OnSubmit(){
    var zaznam = <IStavebniDenik> {
      Datum: this.stavebniDenikForm.controls['datum'].value,
      Popis: this.stavebniDenikForm.contains['popis'].value,
      Zakazka: this.zakazka,
      Zamestnanec: this.sessionStorageService.GetCurrentUser()
    }

    this.stavebniDenikService.PridatZaznam(zaznam).subscribe(x => {
      console.log(x);
    }, 
    e => {
      console.log(e);
    });
  }
}
