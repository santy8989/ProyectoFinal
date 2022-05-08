import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module'
import {MatButtonModule} from '@angular/material/button';

import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    // AngularMaterialModule,
    MatButtonModule
    
  ],
  exports: [
    LoginComponent
  ]
})
export class RoutesModule { }
