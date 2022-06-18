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
  Usuario:any={
    $key:"void",
  }
  // @Input() pageSize = 6;
  UserDisplayedColumns: string[] = ['nombre', 'apellido', 'DNI', 'tipo','Acciones'];
  CarreraDisplayedColumns: string[] = ['nombre', 'Sigla','Acciones'];
  MateriasDisplayedColumns: string[] = ['nombre', 'carrera','profesor','encargado','cantHoras','Acciones'];
  PeriodosDisplayedColumns: string[] = ['Fecha_str','Fecha_fn','CantSemanas','Acciones'];
  dataSource: MatTableDataSource < any > ;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _UserService:UserService,
    public dialog: MatDialog,
    private _CarreraServoce:CarreraService,
    private _PeriodoService:PeriodosService,
    private _MateriaService:MateriasService) {}

  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngOnInit(): void {
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
  }
  }
  ngAfterViewInit() {
   this.GetData();
}
  openDialog(action:string, obj:any) {
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