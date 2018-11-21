import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { EventEmitter } from 'events';
import { LoginModel } from '../shared/models/login.model';
import { LoginApiService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {
  @Output() userChanged: EventEmitter;

  private loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginApi: LoginApiService) {
    this.loginForm = this.fb.group({
      login: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)});
  }

  ngOnInit() {
  }

  OnSubmit(){
    if(this.loginForm.valid){
      const model = new LoginModel();
      model.login = this.loginForm.controls["login"].value;
      model.password = this.loginForm.controls["password"].value;

      this.loginApi.login(model)
      .subscribe(x => {
        console.log(x);
      },
      e => {
        console.log(e);
      })
    }
  }
}
