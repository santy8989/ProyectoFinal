import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { UsersDialogBoxComponent } from './users-dialog-box/users-dialog-box.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavBarComponent,
    SideBarComponent,
    DataTableComponent,
    UsersDialogBoxComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    
    FormsModule
    
  ],
  exports:
  [
    NavBarComponent,
    SideBarComponent,
    DataTableComponent,
    UsersDialogBoxComponent,
    
  ]
})
export class SharesModule { }
