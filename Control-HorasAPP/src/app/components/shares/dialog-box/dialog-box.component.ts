import { OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, Inject, NgZone, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/services/User-service';
import { usuario } from 'src/app/interfaces/usuario';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
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
import { TeamMateriasService } from 'src/app/services/team-materias.service';
import { CargaHorasService } from 'src/app/services/carga-horas.service';
// import { EMLINK } from 'constants';

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
  public formHoras: FormGroup;
  public formteam: FormGroup;
  public form: FormGroup;
  Carreras:any[]
  CurrentDNI:string
  materias:any[]
  periodos:any[]
  profesionales:any[]
  materiasByprofesional:any[]
  Users:any[]
  Teams:any[]
  TeamsToDelete:any[]
  ContentLoaded:boolean =false;
  action:string;
  type:string;
  nombre:string;
  apellido:string;
  pass:string;
  DNI:number;
  _id:string
  sigla:string;
  isValid:boolean;
  cargo:string="seleccione un profesional"
  encargado:string="seleccione una materia";
  CargaHoras:any={ 
  
    periodo  :"",
    materia  : "",
    profesional  : "",
    cantHoras:"",
    cargo:""

};
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
  Team:any={ 
 
      NombreMiembro  :"",
      ApellidoMiembro  : "",
      DNI_miembro  : "",
      PuestoMiembro:"",
      status:"new"

  }
  ProfesionalDisabled=true;
  
  array=["santi","juan","sig"]

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
    private _TeamMateriasService:TeamMateriasService,
    private _cargaHoras:CargaHorasService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.array[0]="banana"
    // this.array[1]="anana"
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
    this.CurrentDNI=localStorage.getItem('DNI')
    
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
    this.formHoras = new FormGroup({
      periodo : new FormControl(this.local_data.periodo, [Validators.required]),
      materia : new FormControl(this.local_data.materia, [Validators.required]),
      cantHoras : new FormControl(this.local_data.cantHoras,[Validators.required]),
      profesional : new FormControl(this.local_data.profesional, [Validators.required]),
    });
    this.formteam = new FormGroup({
      nombre : new FormControl( [Validators.required]),
      apellido : new FormControl( [Validators.required]),
      dni : new FormControl( [Validators.required]),
      puesto : new FormControl( [Validators.required]),
      
 
    });
   
    this.formteam = new FormGroup({
      name: new FormControl(''),
        
        items: new FormArray([
          new FormGroup({
            name: new FormControl('name2'),
            apellido: new FormControl('apellido2'),
      }),
          new FormGroup({
            name: new FormControl('name'),
            apellido: new FormControl('apellido3'),
      }),
          new FormGroup({
            name: new FormControl('name'),
            apellido: new FormControl('apellido4'),
          })
        ])
      });
      this.form = new FormGroup({
        name: new FormControl(''),
          
          addresses: new FormArray([
            new FormGroup({
              address: new FormControl('address1')
        }),
            new FormGroup({
              address: new FormControl('address2')
        }),
            new FormGroup({
              address: new FormControl('address3')
            })
          ])
        });
       

    if (this.local_data.type=="materia")
    {
      this.getCarreras()
      this.getUsers()
      this.ContentLoaded=true
    }
    if(this.local_data.type=="team"){
      this.getTeams()
    }
    if(this.local_data.type=="cargaHoras"){
      this.getPeriodos();
      this.getUsers();
      this.getmateriaByProfesional()
    }
  }
  getCarreras(){
    this._CarreraService.GetCarreraListFirebase().then(resultado => {
      if(resultado.length>0){
      this.Carreras=resultado
      }
    });
    
  }

  verificarProfesional(){
    let materiaLocal=this.formHoras.controls['materia'].value.split('-')
    this.encargado=materiaLocal[2]
    // let =this.formHoras.controls[''].value
    this._TeamMateriasService.GetTeamMembersListFirebase(materiaLocal[0]).then(resultado => {
      if(resultado.length>0){
        this.profesionales=resultado
        this.ProfesionalDisabled=false
        this.Team.NombreMiembro=atob(localStorage.getItem('Nombre'));
        this.Team.ApellidoMiembro=atob(localStorage.getItem('Apellido'));
        this.Team.DNI_miembro=localStorage.getItem('DNI');
        this.Team.PuestoMiembro="titular";

       this.profesionales.push(this.Team)
      }else{
        this.profesionales=[]
        this.ProfesionalDisabled=false
      }
      
    console.log("teste",this.profesionales)
    });
   
  }
  prefesionaSelected(){
    console.log(this.formHoras.controls['profesional'].value)
    let profesional=this.formHoras.controls['profesional'].value.split('-')
    console.log(profesional)
    this.cargo=profesional[1]
  }
  getmateriaByProfesional(){
    this._MateriaService.GetMateriaListByprofesionalFirebase(this.CurrentDNI).then(resultado => {
      if(resultado.length>0){
      this.materiasByprofesional=resultado
      }
    });
    
  }
  getPeriodos(){
    this._PeriodoService.GetPeriodosListFirebase().then(resultado => {
      if(resultado.length>0){
        console.log(resultado)
      this.periodos=resultado
      }
    });
  }
  agregarMember(){
    this.Teams.push(this.Team)
  }

  borrarMember(index:number){
    if(this.Teams[index].status!="new")
    {
      this.TeamsToDelete.push(this.Teams[index])
    }
    this.Teams.splice(index,1)
    // console.log(this.TeamsToDelete)
  }
  getTeams(){
    this._TeamMateriasService.GetTeamMembersListFirebase(this.local_data.nombre).then(resultado => {
      if(resultado.length>0){
          resultado.map(function(elemnt:any ) {
            elemnt.status="old"
            return ;
        });
        this.Teams=resultado
        this.ContentLoaded=true
        this.TeamsToDelete=[];
      }else{
        this.Teams=[]
        this.ContentLoaded=true
        this.TeamsToDelete=[];
      }
      
    console.log("teste",resultado)
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
  SubmitTeam(){
    {
    console.log(this.Teams)
    console.log(this.local_data)
    this.Teams.forEach(element => {
      if(element.status=="new"){
        this._TeamMateriasService.AddTeamMembersListFirebase(element,this.local_data).then(response => {
           console.log("created")
          }, error => {
            console.error("tuve un Error" + error)
          })
      }
      if(element.status=="old"){
        this._TeamMateriasService.UpdateTeamMembersListFirebase(element).then(response => {
           console.log("edited")
          }, error => {
            console.error("tuve un Error" + error)
          })
      }
      
    });
    this.TeamsToDelete.forEach(element => {
      this._TeamMateriasService.DeleteTeamMembersListFirebase(element.id_firebase).then(response => {
        console.log("deleted")
       }, error => {
         console.error("tuve un Error" + error)
       })
    });
    this.dialogRef.close({
      event: this.action,
      data: this.local_data
    });
     
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
  SubmitHoras(){
    let materiaLocal=this.formHoras.controls['materia'].value.split('-')
    let profesional=this.formHoras.controls['profesional'].value.split('-')
    let periodoForm=this.formHoras.controls['periodo'].value.split('$')
    
    this.CargaHoras.periodo=periodoForm[0]
    this.CargaHoras.periodoFormated=periodoForm[1]
    this.CargaHoras.materia=materiaLocal[0]
    this.CargaHoras.profesional=profesional[0]
    this.CargaHoras.profesionalNya=profesional[2].replace('$', ' ')
    // this.CargaHoras.profesionalNya
    this.CargaHoras.cargo=profesional[1]
    this.CargaHoras.encargadoDNI=materiaLocal[1]
    this.CargaHoras.encargadoNya=materiaLocal[2]
    this.CargaHoras.cantHoras=this.local_data.cantHoras
    console.log(this.CargaHoras)
    switch (this.action) {
      case "Agregar": {
            this._cargaHoras.AddCargaHorasFirebase(this.CargaHoras).then(response => {
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
      }
      break;
      case "Borrar": {
      }
      break;
  }


  }
  SubmitMateria() {
    
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
        this._MateriaService.GetMateriaFirebase(this.Materia.nombre).then(resultado => {
          if(resultado.length>0){
            this._snackBar.open("El nombre de la materia debe ser único", "X",{
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000,
              panelClass: ['snackBar'] 
               });
            }
          else{
            this._MateriaService.AddMateriaFirebase(this.Materia).then(response => {
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
      case "cargaHoras": {
        return this.formHoras.controls[controlName].hasError(errorName);
        
      }
      break;
      default:{
        return this.formCarrera.controls[controlName].hasError(errorName);
      }
      break

  }
    
  }

}