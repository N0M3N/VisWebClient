import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IZakazka } from '../shared/models/zakazka.model';
import { ActivatedRoute } from '@angular/router';
import { ZakazkaApiService } from '../shared/services/zakazka.service';
import { StavebniDenikApiService } from '../shared/services/stavebni-denik.service';
import { IStavebniDenik } from '../shared/models/stavebni-denik.model';
import { SessionStorageService } from '../shared/services/local-storage.service';
import { StavebniDenikPostModel } from '../shared/models/stavebni-denik-post.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-stavebni-denik-form',
  templateUrl: './stavebni-denik-form.component.html'
})
export class StavebniDenikFormComponent implements OnInit, OnDestroy {
  private stavebniDenikForm: FormGroup;
  private zakazka: IZakazka;
  private zaznamyDeniku$: Observable<IStavebniDenik[]>;

  private routeSubscription: Subscription;
  private zakazkaSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private zakazkaService: ZakazkaApiService,
    private stavebniDenikService: StavebniDenikApiService,
    private sessionStorageService: SessionStorageService,
    private fb: FormBuilder
  ) {
    this.stavebniDenikForm = this.fb.group({
      datum: new FormControl(new Date(Date.now()), Validators.required),
      popis: new FormControl("", Validators.required)});

      var today = new Date();
      this.stavebniDenikForm.controls['datum'].patchValue(today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear());
  }

  ngOnInit() {    
    this.routeSubscription = this.route.params.subscribe(x => {
      this.zakazkaSubscription = this.zakazkaService.getById(x.id).subscribe(y =>{
        this.zakazka = y
        this.zaznamyDeniku$ = this.stavebniDenikService.ZaznamyZakazky(this.zakazka);
      },
      e => {
        console.log(e);
      });
    }, 
    e => console.log(e),
    () => this.zakazkaSubscription.unsubscribe());
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
    e => {
      console.log(e);
    },
    () => {
      stavebniDenikSubscription.unsubscribe();
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
