import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import {PdfMakeWrapper, Table} from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
PdfMakeWrapper.setFonts(pdfFonts);

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
  lilButton=false
  // @Input() pageSize = 6;
  public innerWidth: any;
  color: ThemePalette = 'primary';
  ContentLoaded:boolean=false;
  // color2: ThemePalette = 'success';
  HabilitarAprobado:boolean;
  HabilitarAbonado:boolean;
  UserDisplayedColumns: string[] = ['nombre', 'apellido', 'DNI', 'tipo','Acciones'];
  CarreraDisplayedColumns: string[] = ['nombre', 'Sigla','Acciones'];
  MateriasDisplayedColumns: string[] = ['nombre', 'carrera','profesor','encargado','cantHoras','Acciones'];
  PeriodosDisplayedColumns: string[] = ['Fecha_str','Fecha_fn','CantSemanas','Acciones'];
  HorasDisplayedColumns: string[] = ['periodo','Materia','cantHoras','profesional','cargo','encargado','aprobado','Abonado','Acciones'];
  dataSource: MatTableDataSource < any > ;
  DownloadDisabled:boolean=true;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _UserService:UserService,
    public dialog: MatDialog,
    private _CarreraServoce:CarreraService,
    private _PeriodoService:PeriodosService,
    private _MateriaService:MateriasService,
    private _CargaHoras:CargaHorasService,
    private _snackBar: MatSnackBar,
    ) {}

  @ViewChild('empTbSort') empTbSort = new MatSort();
  @HostListener('window:resize', ['$event'])
onResize(event:any) {
  this.innerWidth = window.innerWidth;
  if (this.innerWidth<1400){
this.lilButton=true
  }
  else{
    this.lilButton=false
  }
  console.log(this.innerWidth)
}
  
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth<1400){
      this.lilButton=true
        }
        else{
          this.lilButton=false
        }
    this.CurrentDNI=localStorage.getItem('DNI')
    this.TipoUser=atob(localStorage.getItem('Tipo'));
    this.HabilitarAprobado=this.TipoUser!="Encargado"
    this.HabilitarAbonado=this.TipoUser!="Admin"
  }
  async pdf(){
    const pdf:PdfMakeWrapper= new PdfMakeWrapper()
    pdf.pageSize({
      width: 1200.28,
      height: 'auto'
  });
    const data:any=this.dataSource
    pdf.add(this.createTable(this.dataSource));
    pdf.create().download()
  }
  createTable(data: MatTableDataSource < any > ):any{
    [{}]
    return new Table([
      ["Periodo","Materia","Profesional","DNI","Cargo","Total de horas","Estado","Encargado","Estado de pago"],
      ...this.ExtractData(data)
    ]).widths([150,100,100,80,150,100,150,100,100])
    .layout({
      fillColor: (rowIndex:number, node:any, columnIndex:number)=>{
        return rowIndex===0?'#CCCCCC':'';
      }
    }).end
  }
  ExtractData(data: MatTableDataSource < any >){
    return data.filteredData.map(row=>[row.periodoFormated,row.materia,row.profesionalNya,row.profesional,row.cargo,row.cantHoras,row.aprobado===true?"Aprobado":"Pendiente de aprobación",row.encargadoNya,row.abonado===true?"Realizado":"No realizado"]);
  }
  AprobadoChange(event:any,element:any){
    this.ContentLoaded=false
    this._CargaHoras.UpdateAprobadoCargaHorasFirebase(element.id_firebase,event.checked).then(resultado => {
      if(!event.checked)
      {
        this._snackBar.open("La entrada fue reprobada con éxito", "X",{
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass:"test",
          panelClass: ['Exito'] 
           });
      }else{
        this._snackBar.open("La entrada fue aprobada con éxito", "X",{
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass:"test",
          panelClass: ['Exito'] 
           });
      }
      this.GetData()

    }, error => {
      console.error("tuve un Error" + error)

    });
  }
  AbonadoChange(event:any,element:any){
    let evento=event
    let elemento=element
    this.ContentLoaded=false
    this._CargaHoras.UpdateAbonadoCargaHorasFirebase(elemento.id_firebase,evento.checked).then(resultado => {
      if(!evento.checked)
      {
        this._snackBar.open("La entrada fue marcada como impaga con éxito", "X",{
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass:"test",
          panelClass: ['Exito'] 
           });
      }else{
        this._snackBar.open("La entrada fue marcada como paga con éxito", "X",{
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
          // panelClass:"test",
          panelClass: ['Exito'] 
           });
      }
      this.GetData()
      
        
    }, error => {
      console.error("tuve un Error" + error)

    });
   

  }
  GetData(){
    switch (this.type) {
      case "usuario": {
        this._UserService.GetUserListFirebase().then(resultado => {
            this.dataSource = new MatTableDataSource(resultado);
            this.dataSource.sort = this.empTbSort;
            this.ContentLoaded=true
          
        });
      }
      break;
      case "carrera": {
        this._CarreraServoce.GetCarreraListFirebase().then(resultado => {
          
            this.dataSource = new MatTableDataSource(resultado);
            this.dataSource.sort = this.empTbSort;
          
          this.ContentLoaded=true

        });
      }
      break;
      case "materia": {
        this._MateriaService.GetMateriaListFirebase().then(resultado => {
          
            this.dataSource = new MatTableDataSource(resultado);
            this.dataSource.sort = this.empTbSort;
          
          this.ContentLoaded=true

        });
       
      }
      break;
      case "periodo": {
        this._PeriodoService.GetPeriodosListFirebase().then(resultado => {
          
          if(resultado.length>0){
            this.dataSource = new MatTableDataSource(resultado);
            this.dataSource.sort = this.empTbSort;
          }
          this.ContentLoaded=true

        });
      }
      break;
      case "cargaHoras": {
        switch(this.TipoUser){
          case "Admin":{
            this._CargaHoras.GetCargaHorasAdminFirebase().then(resultado => {
              
             
                this.dataSource = new MatTableDataSource(resultado);
                this.dataSource.sort = this.empTbSort;
                this.DownloadDisabled=false

              
              this.ContentLoaded=true

            });
          }
          break
          case "Profesor":{
            this._CargaHoras.GetCargaHorasProfeFirebase(this.CurrentDNI).then(resultado => {
            
             
                this.dataSource = new MatTableDataSource(resultado);
                this.dataSource.sort = this.empTbSort;
                this.DownloadDisabled=false

              
              this.ContentLoaded=true

            });
          }
          break
          case "Encargado":{
            this._CargaHoras.GetCargaHorasByEncargadoFirebase(this.CurrentDNI).then(resultado => {
              
             
                this.dataSource = new MatTableDataSource(resultado);
                this.dataSource.sort = this.empTbSort;
                this.DownloadDisabled=false
              
              this.ContentLoaded=true
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
    this.dataSource.filter = filterValue.value.trim().toLowerCase();

    
  }
}