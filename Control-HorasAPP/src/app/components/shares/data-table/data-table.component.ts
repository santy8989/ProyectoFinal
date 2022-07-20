import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import {MatTableDataSource} from '@angular/material/table';
// import { AuthServiceService } from 'src/app/services/auth-service.service';
import { usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/User-service';
import { CarreraService } from 'src/app/services/carrera.service';
import { MateriasService } from 'src/app/services/materias.service';
import { PeriodosService } from 'src/app/services/periodos.service';
import { CargaHorasService } from 'src/app/services/carga-horas.service';
import { ThemePalette } from '@angular/material/core';

//TODO
// cuando se borran todos los registros de la tabla mostarar un estado por defecto o vacio de la tabla, y actualizar para que no quede uno siemre



@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit{
  @Input() type: string;
  usersList: usuario[];
  CurrentDNI:string;
  TipoUser:string;
  Usuario:any={
    $key:"void",
  }
  // @Input() pageSize = 6;
  color: ThemePalette = 'primary';
  HabilitarAprobado:boolean;
  UserDisplayedColumns: string[] = ['nombre', 'apellido', 'DNI', 'tipo','Acciones'];
  CarreraDisplayedColumns: string[] = ['nombre', 'Sigla','Acciones'];
  MateriasDisplayedColumns: string[] = ['nombre', 'carrera','profesor','encargado','cantHoras','Acciones'];
  PeriodosDisplayedColumns: string[] = ['Fecha_str','Fecha_fn','CantSemanas','Acciones'];
  HorasDisplayedColumns: string[] = ['periodo','Materia','cantHoras','profesional','cargo','encargado','aprobado','Acciones'];
  dataSource: MatTableDataSource < any > ;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _UserService:UserService,
    public dialog: MatDialog,
    private _CarreraServoce:CarreraService,
    private _PeriodoService:PeriodosService,
    private _MateriaService:MateriasService,
    private _CargaHoras:CargaHorasService,
    ) {}

  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngOnInit(): void {
    this.CurrentDNI=localStorage.getItem('DNI')
    this.TipoUser=atob(localStorage.getItem('Tipo'));
    this.HabilitarAprobado=this.TipoUser!="Encargado"
    console.log("tipo",this.type)
    console.log(); 
    
    // this.dataSource.sort = this.sort;
  }
  GetData(){
    switch (this.type) {
      case "usuario": {
        this._UserService.GetUserListFirebase().then(resultado => {
          console.log("hi",resultado)
          if(resultado.length>0){
            this.dataSource = new MatTableDataSource(resultado);
            this.dataSource.sort = this.empTbSort;
          }else{
            console.log("Revise el Número de DNI")
          }
        });
      }
      break;
      case "carrera": {
        this._CarreraServoce.GetCarreraListFirebase().then(resultado => {
          // console.log("hi",resultado)
          if(resultado.length>0){
            this.dataSource = new MatTableDataSource(resultado);
            this.dataSource.sort = this.empTbSort;
          }
        });
      }
      break;
      case "materia": {
        this._MateriaService.GetMateriaListFirebase().then(resultado => {
          // console.log("hi",resultado)
          if(resultado.length>0){
            this.dataSource = new MatTableDataSource(resultado);
            this.dataSource.sort = this.empTbSort;
          }
        });
       
      }
      break;
      case "periodo": {
        this._PeriodoService.GetPeriodosListFirebase().then(resultado => {
          // console.log("hi",resultado)
          if(resultado.length>0){
            this.dataSource = new MatTableDataSource(resultado);
            this.dataSource.sort = this.empTbSort;
          }
        });
      }
      break;
      case "cargaHoras": {
        switch(this.TipoUser){
          case "Admin":{
            this._CargaHoras.GetCargaHorasAdminFirebase().then(resultado => {
              // console.log("hi",resultado)
              if(resultado.length>0){
                this.dataSource = new MatTableDataSource(resultado);
                this.dataSource.sort = this.empTbSort;
              }
            });
          }
          break
          case "Profesor":{
            this._CargaHoras.GetCargaHorasAdminFirebase().then(resultado => {
              // console.log("hi",resultado)
              if(resultado.length>0){
                this.dataSource = new MatTableDataSource(resultado);
                this.dataSource.sort = this.empTbSort;
              }
            });
          }
          break
          case "Encargado":{
            this._CargaHoras.GetCargaHorasAdminFirebase().then(resultado => {
              // console.log("hi",resultado)
              if(resultado.length>0){
                this.dataSource = new MatTableDataSource(resultado);
                this.dataSource.sort = this.empTbSort;
              }
            });
          }
          break
        }
      }
      break;
  }
  }
  ngAfterViewInit() {
   this.GetData();
}
  openDialog(action:string, obj:any) {
    console.log(action)
    obj.action = action;
    obj.type=this.type
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj,
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetData();
    });

    
  }
  openDialogTeam(action:string, obj:any) {
    obj.action = action;
    obj.type="team"
    console.log(obj)
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj,
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetData();
    });

    
  }
  

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
  applyFilter(filterValue: any) {
    console.log(filterValue.value)
    this.dataSource.filter = filterValue.value.trim().toLowerCase();

    
  }
}