import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { usuario } from '../interfaces/usuario';
import { Usuario } from '../Clases/usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  usersList!: AngularFireList<usuario>;
  // studentsRef: AngularFireList<any>;
  userRef!: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  GetUserList(){
    console.log("read")
    return this.usersList = this.db.list('users');
  }
  AddUser( user:usuario) {
    console.log("add")
    this.usersList.push({
        nombre: user.nombre,
        contra: user.contra,
        tipo: user.tipo,
        DNI: user.DNI

      })
      .catch((error) => {
        this.errorMgmt(error);
      });
  }
  UpdateUser(user:usuario){
    
    this.usersList.update(user.$key|| '111',{
      nombre: user.nombre,
      contra: user.contra,
      tipo: user.tipo,
      DNI: user.DNI
    })

  }
  private errorMgmt(error: any) {
    console.log(error);
  }
}
