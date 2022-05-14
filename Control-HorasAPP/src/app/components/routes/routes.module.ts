import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module'
import {MatButtonModule} from '@angular/material/button';

import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { RoutesModule } from './components/routes/routes.module';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    // AngularMaterialModule,
    MatButtonModule,
    FormsModule,    //import here
    ReactiveFormsModule,
    RouterModule
    
  ],
  exports:[
    LoginComponent,
    DashboardComponent,
  ]
  
  
})
export class RoutesModule { }
