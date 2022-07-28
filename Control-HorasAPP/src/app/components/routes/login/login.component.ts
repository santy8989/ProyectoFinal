import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/interfaces/usuario';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/User-service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usersList: usuario[];
  public loginForm: FormGroup;
  Usuario:any={
    $key:"void",
  }
  constructor( private _UserService:UserService, private router: Router,private _snackBar: MatSnackBar,) {
   
   }
   public onSubmit($event: any) {
      this.ObtenerUsuarios($event)
     
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
    //consultar en firebase si el DNI pertenece a un usuario
    this._UserService.AuthWithFirebase($event.value.DNI).then(resultado => {
      if(resultado.length>0){
        for (let index = 0; index < resultado.length; index++) {
          const element:any = resultado[index];
          if (element.contra==$event.value.password) {
            console.log(element)
            localStorage.setItem('Nombre', btoa(element.nombre));
            localStorage.setItem('Apellido', btoa(element.apellido));    
            localStorage.setItem('Tipo', btoa(element.tipo.toString()));
            localStorage.setItem('DNI', element.DNI.toString() );
            localStorage.setItem('_id', element['id_firebase'] );
            this.router.navigate(["/dashboard/2"])
          }else{
            this._snackBar.open("Datos de inicio de sesion incorrectos", "X",{
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000,
              panelClass: ['Error'] 
               });

          }
        }
      }else{
      }     
    });   
  }
}
