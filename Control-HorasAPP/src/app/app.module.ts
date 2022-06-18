import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from "@angular/material/input";

// MatDatepickerModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//firebase
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import{ environment} from '../environments/environment'
import { AngularFireModule } from '@angular/fire/compat';
import { RoutesModule } from './components/routes/routes.module';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AngularMaterialModule } from './angular-material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    RoutesModule,
    MatSliderModule,
    MatToolbarModule,
    AppRoutingModule,
    AngularMaterialModule,
    MatDialogModule,

  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
