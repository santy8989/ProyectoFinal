import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module'
import {MatButtonModule} from '@angular/material/button';

import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharesModule } from '../shares/shares.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CarrerasComponent } from './carreras/carrera.component';
import { MateriasComponent } from './materias/materias.component';
import { PeriodosComponent } from './periodos/periodos.component';
// import { RoutesModule } from './components/routes/routes.module';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    UsuariosComponent,
    CarrerasComponent,
    MateriasComponent,
    PeriodosComponent,
    
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,   
    ReactiveFormsModule,
    RouterModule,
    SharesModule
    
  ],
  exports:[
    LoginComponent,
    DashboardComponent,
    UsuariosComponent,
    CarrerasComponent
  ]
  
  
})
export class RoutesModule { }
