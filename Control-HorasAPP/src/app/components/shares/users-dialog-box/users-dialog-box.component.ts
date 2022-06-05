import { OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, Inject, NgZone, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/services/User-service';
import { usuario } from 'src/app/interfaces/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { style } from '@angular/animations';
import { facultad } from 'src/app/interfaces/facultad';
import { FacultadService } from 'src/app/services/facultad.service';


@Component({
  selector: 'app-users-dialog-box',
  templateUrl: './users-dialog-box.component.html',
  styleUrls: ['./users-dialog-box.component.css']
})
export class UsersDialogBoxComponent implements OnInit {
  local_data:any;
  public formUsuario: FormGroup; 
  public formFacultad: FormGroup; 
  action:string;
  type:string;
  nombre:string;
  apellido:string;
  pass:string;
  DNI:number;
  _id:string
  sigla:string;
  isValid:boolean;
  User:usuario={
    nombre:"none",
    apellido:"none",
    contra:"none",
    tipo:1,
    DNI:1,

  }
  Facultad:facultad={
    nombre:"none",
    sigla:"none"

  }
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild('name') name: ElementRef;
  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  constructor(private _ngZone: NgZone,
    public dialogRef: MatDialogRef<any>,
    private _snackBar: MatSnackBar,
    private _UserService:UserService,
    private _FacultadService:FacultadService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data,"niceeeeeee")
    this.local_data = {...data};
    this.action = this.local_data.action;
    this.isValid=this.action=="Agregar" ? false : true 
    this.type= this.local_data.tipo
    console.log(this.local_data.DNI,"laskjdlkasjdlaksjd")
    this.DNI= this.local_data.DNI
    this.nombre= this.local_data.nombre
    this.apellido= this.local_data.apellido
    this._id= this.local_data.id_firebase
    this.pass=this.local_data.contra
    this.sigla=this.local_data.sigla
    
  }
  ngOnInit() {
  console.log("helou",this.data.type)
    this.formUsuario = new FormGroup({
      name : new FormControl(this.local_data.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      apellido : new FormControl(this.local_data.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      NUMDNI : new FormControl(this.local_data.DNI, [Validators.required, Validators.min(10000000), Validators.max(55000000)]),
      tipo : new FormControl(this.local_data.tipo, [Validators.required]),
    });
    this.formFacultad = new FormGroup({
      name : new FormControl(this.local_data.nombre, [Validators.required, Validators.minLength(3)]),
      sigla : new FormControl(this.local_data.nombre,[])
     
    });
  }
  SubmitUser() {
    this.User.DNI= this.local_data.DNI
    this.User.nombre= this.local_data.nombre
    this.User.apellido= this.local_data.apellido
    this.User.$key= this.local_data.id_firebase
    this.User.contra=this.local_data.contra
    this.User.tipo=this.local_data.tipo
    switch (this.action) {
      case "Agregar": {
        this._UserService.AuthWithFirebase(this.User.DNI).then(resultado => {
          console.log("hi",resultado)
          if(resultado.length>0){
            this._snackBar.open("El DNI del Usuario deber único", "X",{
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000,
              panelClass: ['snackBar'] 
               });
            }
          else{
            this._UserService.AddUserFirebase(this.User).then(response => {
              this.dialogRef.close({
                event: this.action,
                data: this.local_data
              });
            }, error => {
              console.error("tuve un Error" + error)
            })
          }
          
        });
       
      }
      break;
      case "Editar": {
        this._UserService.UpdateUserFirebase(this.User).then(response => {
          this.dialogRef.close({
            event: this.action,
            data: this.local_data
          });
        }, error => {
          console.error("tuve un Error" + error)
    
        })
      }
      break;
      case "Borrar": {
        this._UserService.DeleteUserFirebase(this.User.$key).then(response => {
          this.dialogRef.close({
            event: this.action,
            data: this.local_data
          });
        }, error => {
          console.error("tuve un Error" + error)
    
        })
      }
      break;
  }
   
  }
  SubmitFacultad() {
    this.Facultad.sigla= this.local_data.sigla
    this.Facultad.nombre= this.local_data.nombre
    this.Facultad.$key= this.local_data.id_firebase
    switch (this.action) {
      case "Agregar": {
        this._FacultadService.AddFacultadFirebase(this.Facultad).then(response => {
          this.dialogRef.close({
            event: this.action,
            data: this.local_data
          });
        }, error => {
          console.error("tuve un Error" + error)
        })
       
      }
      break;
      case "Editar": {
        this._FacultadService.UpdateFacultadFirebase(this.Facultad).then(response => {
          this.dialogRef.close({
            event: this.action,
            data: this.local_data
          });
        }, error => {
          console.error("tuve un Error" + error)
    
        })
      }
      break;
      case "Borrar": {
        this._FacultadService.DeleteFacultadFirebase(this.Facultad.$key).then(response => {
          this.dialogRef.close({
            event: this.action,
            data: this.local_data
          });
        }, error => {
          console.error("tuve un Error" + error)
    
        })
      }
      break;
  }
   
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
  public checkError = (controlName: string, errorName: string) => {
    switch (this.data.type) {
      case "usuario": {
        return this.formUsuario.controls[controlName].hasError(errorName);
        
      }
      break;
      case "facultad": {
        return this.formFacultad.controls[controlName].hasError(errorName);

      }
      break;
  
      default:{
        return this.formFacultad.controls[controlName].hasError(errorName);
      }
      break

  }
    
  }

}