import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { VeiculoComponent } from './veiculo/veiculo.component';
import { VeiculoListComponent } from './veiculo-list/veiculo-list.component';
import { VeiculoResolver } from './veiculo-resolver';
import { BuscarVeiculoComponent } from './buscar-veiculo/buscar-veiculo.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'veiculo', component: VeiculoComponent, resolve: {veiculo: VeiculoResolver}},
  {path: 'veiculo-list', component: VeiculoListComponent},
  {path: 'buscar-veiculo', component: BuscarVeiculoComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
