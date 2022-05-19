import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { UsersDialogBoxComponent } from '../users-dialog-box/users-dialog-box.component';
import {MatTableDataSource} from '@angular/material/table';
// import { AuthServiceService } from 'src/app/services/auth-service.service';
import { usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/User-service';





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
  FacultadDisplayedColumns: string[] = ['nombre', 'universidad','Acciones'];
  dataSource: MatTableDataSource < any > ;

  constructor(private _liveAnnouncer: LiveAnnouncer,private _UserService:UserService,public dialog: MatDialog) {}

  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngOnInit(): void {
    console.log("tipo",this.type)
    
    // this.dataSource.sort = this.sort;
  }
  GetData(){
    switch (this.type) {
      case "user": {
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
      case "Facultad": {
       
      }
      break;
  }
  }
  ngAfterViewInit() {
   this.GetData();
}
  openDialog(action:string, obj:any) {
    obj.action = action;
    console.log(obj)
    // obj.type = this.type
    const dialogRef = this.dialog.open(UsersDialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("asdasd",result)
      this.GetData();
    });
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    console.log("banana",sortState)
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
}