import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  usersList!: AngularFireList<any>;
  // studentsRef: AngularFireList<any>;
  userRef!: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}
  AddUser() {
    console.log("servicio")
    this.usersList.push({
        name: 'test',
        pass: "2222",
      })
      .catch((error) => {
        this.errorMgmt(error);
      });
  }
  GetUserList() {
    console.log("read")
    this.usersList = this.db.list('users');
    this.AddUser()
    return this.usersList;
  }
  private errorMgmt(error: any) {
    console.log(error);
  }
}
