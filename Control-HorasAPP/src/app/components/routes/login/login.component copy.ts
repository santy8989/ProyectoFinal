import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { usuario } from 'src/app/interfaces/usuario';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usersList: usuario[];
  public loginForm: FormGroup;

  user :usuario={
    nombre: "santy",
    contra:"test",
    DNI:40470460,
    tipo:"admin"
  }
  Usuario:any={
    $key:"void",
  }
  constructor( private _AuthService:AuthServiceService) {
   
   }
   public onSubmit($event: any) {
    console.log('$event --< ', $event);
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      DNI: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }, {
        updateOn: 'blur'
      });
   this._AuthService.GetUserList().snapshotChanges().subscribe(item => {this.usersList=[];
//   item.forEach(element =>{
//     this.Usuario =element.payload.toJSON();
//     this.Usuario['$key']=element.key;
//     console.log(this.Usuario)
//     this.usersList.push(this.Usuario)
//     console.log(this.usersList.length) 
//   }
//  )
 for (let i = 0; i < item.length; i++) {
  this.Usuario =item[i].payload.toJSON();
    this.Usuario['$key']=item[i].key;
    console.log(this.Usuario)
    this.usersList.push(this.Usuario)
    console.log(this.usersList.length) 
}
} ) ;
  
  }


  

}
