import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { usuario } from 'src/app/interfaces/usuario';
// import { UserService } from 'src/app/services/auth-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Clases/usuario';
import { UserService } from 'src/app/services/User-service';
// import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usersList: usuario[];
  public loginForm: FormGroup;

  // user :usuario={
  //   nombre: "santy",
  //   contra:"test",
  //   DNI:40470461,
  //   tipo:"admin"
  // }
  Usuario:any={
    $key:"void",
  }
  constructor( private _UserService:UserService, private router: Router) {
   
   }
   public onSubmit($event: any) {
      this.ObtenerUsuarios($event)
      // this._UserService.AddUser(this.user)
     
  }
  ngOnInit(): void {
    
  
  
    // setTimeout(() => {
    //   console.log("tetet")
    //   console.log(this._UserService.user)
    // }, 2000);
    this.loginForm = new FormGroup({
      DNI: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }, {
        updateOn: 'blur'
      });
  
  
  }
  ObtenerUsuarios($event:any){
    console.log($event)
    this._UserService.AuthWithFirebase($event.value.DNI).then(resultado => {
      console.log("hi",resultado)
      if(resultado.length>0){
        for (let index = 0; index < resultado.length; index++) {
          const element:usuario = resultado[index];
          // console.log(element,"elemtooooooooooooo")
          if (element.contra==$event.value.password) {
            console.log(btoa(element.nombre),"nice",element.nombre)
            localStorage.setItem('Nombre', btoa(element.nombre));
            localStorage.setItem('Apellido', btoa(element.apellido));    
            localStorage.setItem('Tipo', btoa(element.tipo.toString()));
            localStorage.setItem('DNI', element.DNI.toString() );

            // location.reload();
            this.router.navigate(["/dashboard/2"])
          }else{
            console.log("contraseña erronea")
          }
        }
      }else{
        console.log("Revise el Número de DNI")
      }
      
    });
      
  }
  AddUser(){
   
      
  }

}
