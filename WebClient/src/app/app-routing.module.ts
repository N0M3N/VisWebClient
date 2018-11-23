import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ActionsEnum } from './shared/enums/actionsEnum';
import { HomeComponent } from './home/home.component';
import { StavebniDenikComponent } from './stavebni-denik/stavebni-denik.component';
import { DetailZakazkyComponent } from './detail-zakazky/detail-zakazky.component';
import { KalkulaceComponent } from './kalkulace/kalkulace.component';
import { ListZakazekComponent } from './list-zakazek/list-zakazek.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: ActionsEnum.Denik.toString() + "/:id", component: StavebniDenikComponent
  },
  {
    path: ActionsEnum.Detail.toString() + "/:id", component: DetailZakazkyComponent
  },
  {
    path: ActionsEnum.Kalkulace.toString() + "/:id", component: KalkulaceComponent
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
