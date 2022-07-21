import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/routes/dashboard/dashboard.component';
import { CarrerasComponent } from './components/routes/carreras/carrera.component';
import { LoginComponent } from './components/routes/login/login.component';
import { MateriasComponent } from './components/routes/materias/materias.component';
import { UsuariosComponent } from './components/routes/usuarios/usuarios.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login-guard.guard';
import { PeriodosComponent } from './components/routes/periodos/periodos.component';
import { ProfeGuard } from './guards/profe.guard';
import { CargaHorasComponent } from './components/routes/carga-horas/carga-horas.component';



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
    path: 'periodos',
    component: PeriodosComponent,
    pathMatch:'full',
    canActivate: [LoginGuard,AdminGuard]
  },
  {
    path: 'carreras',
    component: CarrerasComponent,
    pathMatch:'full',
    canActivate: [LoginGuard,AdminGuard]
  },
  {
    path: 'materias',
    component: MateriasComponent,
    pathMatch:'full',
    canActivate: [LoginGuard,ProfeGuard]
  },
  {
    path: 'cargaHoras',
    component: CargaHorasComponent,
    pathMatch:'full',
    canActivate: [LoginGuard]
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
