import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StavebniDenikComponent } from './stavebni-denik/stavebni-denik.component';
import { DetailZakazkyComponent } from './detail-zakazky/detail-zakazky.component';
import { KalkulaceComponent } from './kalkulace/kalkulace.component';
import { ListZakazekComponent } from './list-zakazek/list-zakazek.component';
import { StavebniDenikFormComponent } from './stavebni-denik-form/stavebni-denik-form.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: "Denik/:id", component: StavebniDenikFormComponent
  },
  {
    path: "Detail/:id", component: DetailZakazkyComponent
  },
  {
    path: "Kalkulace/:id", component: KalkulaceComponent
  },
  {
    path: "list/:next", component: ListZakazekComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
