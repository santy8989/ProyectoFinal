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
import { FacultadesComponent } from './facultades/facultades.component';
// import { RoutesModule } from './components/routes/routes.module';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    UsuariosComponent,
    FacultadesComponent,
    
  ],
  imports: [
    CommonModule,
    // AngularMaterialModule,
    MatButtonModule,
    FormsModule,    //import here
    ReactiveFormsModule,
    RouterModule,
    SharesModule
    
  ],
  exports:[
    LoginComponent,
    DashboardComponent,
    UsuariosComponent
  ]
  
  
})
export class RoutesModule { }
