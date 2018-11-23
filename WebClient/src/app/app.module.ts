import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { LoginApiService } from './shared/services/login.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionStorageService } from './shared/services/local-storage.service';
import { HomeComponent } from './home/home.component';
import { ActionsEnum } from './shared/enums/actionsEnum';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginApiService,
    SessionStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
