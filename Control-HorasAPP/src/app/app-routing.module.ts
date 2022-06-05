import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/routes/dashboard/dashboard.component';
import { FacultadesComponent } from './components/routes/facultades/facultades.component';
import { LoginComponent } from './components/routes/login/login.component';
import { UsuariosComponent } from './components/routes/usuarios/usuarios.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login-guard.guard';



const routes: Routes = [
 
  {
    path: 'login',
    component: LoginComponent,
    pathMatch:'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch:'full',
    canActivate: [LoginGuard]
    
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    pathMatch:'full',
    canActivate: [LoginGuard,AdminGuard]
  },
  {
    path: 'facultades',
    component: FacultadesComponent,
    pathMatch:'full',
    canActivate: [LoginGuard,AdminGuard]
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
