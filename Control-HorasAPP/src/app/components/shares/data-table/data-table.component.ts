import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { UsersDialogBoxComponent } from '../users-dialog-box/users-dialog-box.component';
import {MatTableDataSource} from '@angular/material/table';
// import { AuthServiceService } from 'src/app/services/auth-service.service';
import { usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/User-service';
import { FacultadService } from 'src/app/services/facultad.service';





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
  FacultadDisplayedColumns: string[] = ['nombre', 'Sigla','Acciones'];
  dataSource: MatTableDataSource < any > ;

  constructor(private _liveAnnouncer: LiveAnnouncer,private _UserService:UserService,public dialog: MatDialog,private _FacultadService:FacultadService) {}

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
      case "facultad": {
        this._FacultadService.GetFacultadListFirebase().then(resultado => {
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
    console.log(obj)
    const dialogRef = this.dialog.open(UsersDialogBoxComponent, {
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