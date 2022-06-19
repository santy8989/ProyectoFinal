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
import { carrera } from 'src/app/interfaces/carrera';
import { CarreraService } from 'src/app/services/carrera.service';
import { materia } from 'src/app/interfaces/materias';
import { MateriasService } from 'src/app/services/materias.service';
import { periodo } from 'src/app/interfaces/periodo';
import * as moment from 'moment';
import { PeriodosService } from 'src/app/services/periodos.service';

@Component({
  selector: 'app-users-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  local_data:any;
  fecha:Date;
  
  public formUsuario: FormGroup; 
  public formCarrera: FormGroup; 
  public formMateria: FormGroup;
  public formPeriodo: FormGroup;
  Carreras:any[]
  Users:any[]
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
    tipo:"none",
    DNI:1,

  }
  Facultad:carrera={
    nombre:"none",
    sigla:"none"

  }
  Materia:materia={
    nombre:"none",
    carrera: "none",
    profesorDNI: 0,
    encargadoDNI: 0,
    profesorNya:"none",
    encargadoNya:"none",
    cantHoras: 0,

  }
  Periodo:periodo={ 
    fecha_INI  :"none",
    fecha_FIN  : "none",
    Cant_Semanas  : 0,

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
    private _CarreraService:CarreraService,
    private _MateriaService:MateriasService,
    private _PeriodoService:PeriodosService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log("niceeeeeee",data)
    this.local_data = {...data};
    
    this.action = this.local_data.action;
    this.isValid=this.action=="Agregar" ? false : true 
    this.type= this.local_data.tipo
    // console.log(this.local_data.DNI,"laskjdlkasjdlaksjd")
    this.DNI= this.local_data.DNI
    this.nombre= this.local_data.nombre
    this.apellido= this.local_data.apellido
    this._id= this.local_data.id_firebase
    this.pass=this.local_data.contra
    this.sigla=this.local_data.sigla
    
  }
  ngOnInit() {
    
    this.formUsuario = new FormGroup({
      name : new FormControl(this.local_data.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      apellido : new FormControl(this.local_data.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      NUMDNI : new FormControl(this.local_data.DNI, [Validators.required, Validators.min(10000000), Validators.max(55000000)]),
      tipo : new FormControl(this.local_data.tipo, [Validators.required]),
    });
    this.formCarrera = new FormGroup({
      name : new FormControl(this.local_data.nombre, [Validators.required, Validators.minLength(3)]),
      sigla : new FormControl(this.local_data.nombre,[])
     
    });
   
     this.local_data.encargadoDNI = this.local_data.encargadoDNI?.toString();
     this.local_data.profesorDNI = this.local_data.profesorDNI?.toString();
     
   
    this.formMateria = new FormGroup({
      name : new FormControl(this.local_data.nombre, [Validators.required, Validators.minLength(3)]),
      carrera : new FormControl(this.local_data.carrera, [Validators.required]),
      profesor : new FormControl(this.local_data.profesorDNI, [Validators.required]),
      encargado : new FormControl(this.local_data.encargadoDNI, [Validators.required]),
      cantHoras : new FormControl(this.local_data.cantHoras, [Validators.required]), 
    });
    this.formPeriodo = new FormGroup({
      fecha_ini : new FormControl(this.local_data.fecha_INI, [Validators.required]),
      fecha_fn : new FormControl(this.local_data.fecha_FIN, [Validators.required]),
      Cant_Semanas:new FormControl(this.local_data.Cant_Semanas, [Validators.required]),
 
    });
   
    // console.log('pene', this.local_data);
    console.log('pene', this.local_data);
    if (this.local_data.type=="materia")
    {
      this.getCarreras()
      this.getUsers()
    }
  }
  getCarreras(){
    this._CarreraService.GetCarreraListFirebase().then(resultado => {
      if(resultado.length>0){
      this.Carreras=resultado
      }
    });
    
  }
  getUsers(){
    this._UserService.GetUserListFirebase().then(resultado => {
      // console.log("hi",resultado)
      if(resultado.length>0){
        // this.dataSource = new MatTableDataSource(resultado);
      this.Users=resultado
      // console.log("profes",this.Users)
        // this.dataSource.sort = this.empTbSort;
      }
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
        this._CarreraService.AddCarreraFirebase(this.Facultad).then(response => {
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
        this._CarreraService.UpdateCarreraFirebase(this.Facultad).then(response => {
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
        this._CarreraService.DeleteCarreraFirebase(this.Facultad.$key).then(response => {
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
  SubmitMateria() {
    console.log("cacafrita",this.local_data)
     let dniProfesor =this.local_data.profesorDNI
     let dniEncargado =this.local_data.encargadoDNI
     let nombreProfesor ="Profesor Invalido"
     let nombreEncargado = "Encargado Invalido"
    this.Users.forEach(function (element) {
      if (element.DNI.toString()==dniProfesor)
        nombreProfesor=element.nombre+" "+ element.apellido; 
      if (element.DNI.toString()==dniEncargado)
        nombreEncargado=element.nombre+" "+ element.apellido; 
      return 
  });



    this.Materia.nombre= this.local_data.nombre
    this.Materia.carrera= this.local_data.carrera
    this.Materia.profesorDNI= this.local_data.profesorDNI
    this.Materia.encargadoDNI= this.local_data.encargadoDNI
    this.Materia.profesorNya= nombreProfesor
    this.Materia.encargadoNya=nombreEncargado
    this.Materia.cantHoras= this.local_data.cantHoras
    this.Materia.$key= this.local_data.id_firebase
    switch (this.action) {
      case "Agregar": {
        this._MateriaService.AddMateriaFirebase(this.Materia).then(response => {
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
        this._MateriaService.UpdateMateriaFirebase(this.Materia).then(response => {
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
        this._MateriaService.DeleteMateriaFirebase(this.Materia.$key).then(response => {
          console.log("si")
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
  SubmitPeriodo() {
    console.log("LOCAL DATE IN SUBMIT PERIOD FUNCTION",this.local_data)
    this.Periodo.$key=this.local_data.id_firebase
    this.Periodo.Cant_Semanas=this.local_data.Cant_Semanas
    this.Periodo.fecha_FIN=this.local_data.fecha_FIN
    let milisecond_fn:number=Date.parse(this.Periodo.fecha_FIN)
    this.Periodo.fecha_FIN_formated=moment(milisecond_fn).format("DD/MM/YYYY")
    this.Periodo.fecha_INI=this.local_data.fecha_INI
    let milisecond_ini:number=Date.parse(this.Periodo.fecha_INI)
    this.Periodo.fecha_INI_formated=moment(milisecond_ini).format("DD/MM/YYYY")
  //  this.local_data.fecha_INI="asd"
    // console.log("periodosd",this.local_data.fecha_INI)
    switch (this.action) {
      case "Agregar": {
        this._PeriodoService.AddPeriodoFirebase(this.Periodo).then(response => {
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
        this._PeriodoService.DeletePeriodoFirebase(this.Periodo.$key).then(response => {
          console.log("si")
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
    console.log("cerrrado")
    this.dialogRef.close({event:'Cancel'});
  }
  public checkError = (controlName: string, errorName: string) => {
    switch (this.data.type) {
      case "usuario": {
        return this.formUsuario.controls[controlName].hasError(errorName);
        
      }
      break;
      case "carrera": {
        return this.formCarrera.controls[controlName].hasError(errorName);

      }
      break;
      case "materia": {
        return this.formMateria.controls[controlName].hasError(errorName);
        
      }
      break;
      case "periodo": {
        return this.formPeriodo.controls[controlName].hasError(errorName);
        
      }
      break;
      default:{
        return this.formCarrera.controls[controlName].hasError(errorName);
      }
      break

  }
    
  }

}