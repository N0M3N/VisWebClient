import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IZakazka } from '../shared/models/zakazka.model';
import { ActivatedRoute } from '@angular/router';
import { StavebniDenikApiService } from '../shared/services/stavebni-denik.service';
import { IStavebniDenik } from '../shared/models/stavebni-denik.model';
import { SessionStorageService } from '../shared/services/local-storage.service';
import { StavebniDenikPostModel } from '../shared/models/stavebni-denik-post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stavebni-denik-form',
  templateUrl: './stavebni-denik-form.component.html'
})
export class StavebniDenikFormComponent implements OnInit {
  private stavebniDenikForm: FormGroup;
  private zakazka: IZakazka;
  private zaznamyDeniku$: Observable<IStavebniDenik[]>;

  constructor(
    private route: ActivatedRoute,
    private stavebniDenikService: StavebniDenikApiService,
    private sessionStorageService: SessionStorageService,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe(x => {
      this.zakazka = this.sessionStorageService.GetLatestZakazka(x.id);
      this.zaznamyDeniku$ = this.stavebniDenikService.ZaznamyZakazky(this.zakazka);
    },
    e => console.log(e));

    this.stavebniDenikForm = this.fb.group({
      datum: new FormControl(new Date(Date.now()), Validators.required),
      popis: new FormControl("", Validators.required)});

      var today = new Date();
      this.stavebniDenikForm.controls['datum'].patchValue(today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear());
  }

  ngOnInit() {
  }

  controlValid(controlName: string) : boolean {
    var control = this.stavebniDenikForm.controls[controlName];
    return !control.valid && (control.touched || control.dirty);
  }

  OnSubmit(){
    var datum = this.stavebniDenikForm.controls['datum'].value;
    var popis = this.stavebniDenikForm.controls["popis"].value;

    var zaznam = <StavebniDenikPostModel> {
      Datum: datum,
      Popis: popis,
      ZakazkaId: this.zakazka.Id,
      ZamestnanecId: this.sessionStorageService.GetCurrentUser().Id
    }

    var stavebniDenikSubscription = this.stavebniDenikService.PridatZaznam(zaznam).subscribe(x => {
      this.zaznamyDeniku$ = this.stavebniDenikService.ZaznamyZakazky(this.zakazka);
    },
    e => console.log(e),
    () => stavebniDenikSubscription.unsubscribe());
  }
}
