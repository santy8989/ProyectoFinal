import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let logged=localStorage.getItem('FlagLogged')
    // console.log("asdasd",)
    if (logged!="true"){
      localStorage.setItem('FlagLogged', "true");
      location.reload();
    }
    
  }


}
