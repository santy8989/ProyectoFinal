import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tipo:string
  nombre:string
  apellido:string
  DNI:string

  constructor() { }

  ngOnInit(): void {
    this.nombre = atob(localStorage.getItem('Nombre'));
    this.apellido = atob(localStorage.getItem('Apellido'));
    this.DNI = localStorage.getItem('DNI');
    this.tipo = atob(localStorage.getItem('Tipo'));
    let logged=localStorage.getItem('FlagLogged')
    if (logged!="true"){
      localStorage.setItem('FlagLogged', "true");
      location.reload();
      
    }
    
    
  }


}
