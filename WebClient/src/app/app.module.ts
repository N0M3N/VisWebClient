import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule, MatCheckboxModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from "@angular/material";

import { LoginApiService } from './shared/services/login.service';
import { ZakazkaApiService } from './shared/services/zakazka.service';
import { SessionStorageService } from './shared/services/local-storage.service';
import { StavebniDenikApiService } from './shared/services/stavebni-denik.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListZakazekComponent } from './list-zakazek/list-zakazek.component';
import { StavebniDenikComponent } from './stavebni-denik/stavebni-denik.component';
import { DetailZakazkyComponent } from './detail-zakazky/detail-zakazky.component';
import { KalkulaceComponent } from './kalkulace/kalkulace.component';
import { StavebniDenikFormComponent } from './stavebni-denik-form/stavebni-denik-form.component';
import { LoaderComponent } from './loader/loader.component';
import { KalkulaceApiService } from './shared/services/kalkulace.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListZakazekComponent,
    StavebniDenikComponent,
    DetailZakazkyComponent,
    KalkulaceComponent,
    StavebniDenikFormComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCheckboxModule
  ],
  providers: [
    LoginApiService,
    ZakazkaApiService,
    StavebniDenikApiService,
    KalkulaceApiService,
    SessionStorageService
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
