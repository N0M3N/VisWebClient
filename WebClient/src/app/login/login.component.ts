import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginModel } from '../shared/models/login.model';
import { LoginApiService } from '../shared/services/login.service';
import { SessionStorageService } from '../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
  private loginForm: FormGroup;
  private loginSubscription: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginApi: LoginApiService,
    private sessionStorage: SessionStorageService)
  {
    this.loginForm = this.fb.group({
      login: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)});
  }

  ngOnInit() {
    sessionStorage.clear();
  }

  OnSubmit(){
    if(this.loginForm.valid){
      const model = new LoginModel();
      model.login = this.loginForm.controls["login"].value;
      model.password = this.loginForm.controls["password"].value;

      this.loginSubscription = this.loginApi.login(model)
        .subscribe(x => {
          this.sessionStorage.SetCurrentUser(x);
          this.router.navigate(["home"]);
        },
        e => {
          console.log(e);
      });
    }
  }

  controlValid(controlName: string) : boolean {
    var control = this.loginForm.controls[controlName];
    return !control.valid && (control.touched || control.dirty);
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
