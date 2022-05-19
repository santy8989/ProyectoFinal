import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/routes/dashboard/dashboard.component';
import { LoginComponent } from './components/routes/login/login.component';
import { UsuariosComponent } from './components/routes/usuarios/usuarios.component';



const routes: Routes = [
 
  {
    path: 'login',
    component: LoginComponent,
    pathMatch:'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch:'full'
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    pathMatch:'full'
  },
  
  
  
     {
    path: '**',
    redirectTo:'dashboard',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
