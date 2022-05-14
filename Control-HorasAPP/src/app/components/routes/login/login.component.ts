import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { usuario } from 'src/app/interfaces/usuario';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usersList: usuario[];
  public loginForm: FormGroup;

  user :usuario={
    nombre: "santy",
    contra:"test",
    DNI:40470461,
    tipo:"admin"
  }
  Usuario:any={
    $key:"void",
  }
  constructor( private _AuthService:AuthServiceService, private router: Router) {
   
   }
   public onSubmit($event: any) {
      this.ObtenerUsuarios($event)
      // this._AuthService.AddUser(this.user)
     
  }
  ngOnInit(): void {
    
    this.loginForm = new FormGroup({
      DNI: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }, {
        updateOn: 'blur'
      });
  
  
  }
  ObtenerUsuarios($event:any){
    this._AuthService.GetUserList().snapshotChanges().subscribe(item => {this.usersList=[];
        item.forEach(element =>{
          this.Usuario =element.payload.toJSON();
          this.Usuario['$key']=element.key;
          this.verificarUsuario( $event, this.Usuario);
          this.usersList.push(this.Usuario) 
        }
       )
   
      } )  ;
      
  }
  AddUser(){
   
      
  }

 verificarUsuario($event: any, User:usuario){
   let flag:boolean
        // this.Usuario['$key']=this.usersList[i].key;
        if(User.DNI===$event.value.DNI){
          console.log("DNI")
          if(User.contra===$event.value.password){
            console.log("pass")
            this.router.navigate(["/dashboard"])
          }
        }else{
          console.log("nara")
        }
    
    } ;
 
}
