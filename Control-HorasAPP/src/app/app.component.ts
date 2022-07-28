import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/components/shares/dialog-box/dialog-box.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy,OnInit {
  mobileQuery: MediaQueryList;
  
  usuario:string
  apellido:string
  tipo:any
  UserFlag:boolean=false
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;

  constructor(private router2: Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private router: ActivatedRoute, public dialog: MatDialog,) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    if(localStorage.getItem('Nombre')){
      this.UserFlag=true
    }
    this.usuario = atob(localStorage.getItem('Nombre'));
    this.apellido = atob(localStorage.getItem('Apellido'));
    this.tipo = atob(localStorage.getItem('Tipo'));

  }
  salir(){
    localStorage.removeItem("Nombre");
    localStorage.removeItem("Tipo");
    localStorage.removeItem("Apellido");
    localStorage.removeItem("FlagLogged");
    location.reload()
  }
  openDialog(action:string, obj:any) {
    
    obj.action = action;
    obj.type="información de usuario"
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj,
      
    });
  

    
  }

  
}
