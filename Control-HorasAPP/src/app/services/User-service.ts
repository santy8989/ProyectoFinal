import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { getAuth, signInAnonymously } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { usuario } from '../interfaces/usuario';
import { Usuario } from '../Clases/usuario';
import { Observable } from 'rxjs';
// import { Console } from 'console';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersList!: AngularFireList<usuario>;
  // studentsRef: AngularFireList<any>;
  userRef!: AngularFireObject<any>;
  user!:any;

  constructor(private db: AngularFireDatabase,public Firestore: AngularFirestore,private afauth:AngularFireAuth) {}

  GetUserList(){
    console.log("read")
    console.log(this.GetFavoritosMovie())
    return this.usersList = this.db.list('users')
  }
  // AddUser( user:usuario) {
  //   console.log("add")
  //   this.usersList.push({
  //       nombre: user.nombre,
  //       contra: user.contra,
  //       tipo: user.tipo,
  //       DNI: user.DNI

  //     })
  //     .catch((error) => {
  //       this.errorMgmt(error);
  //     });
  // }
  UpdateUser(user:usuario){
    
    this.usersList.update(user.$key|| '111',{
      nombre: user.nombre,
      contra: user.contra,
      tipo: user.tipo,
      DNI: user.DNI
    })

  }
  GetFavoritosMovie():Observable<any>{
    this.Firestore.firestore.collection(`users`).where("DNI","==",234).get().then((results:any) => { 
      this.user =results.docs.map((doc:any)=> ({
       id_firebase: doc.id,
        ...doc.data()
      }));
    })
  return this.user
 }
 async AuthWithFirebase(DNI:number){
   console.log("dni",DNI)
  try{
    const query=  await this.Firestore.firestore.collection(`users`).where("DNI","==",DNI).get()
      this.user =query.docs.map((doc:any)=> ({
       id_firebase: doc.id,
        ...doc.data()
      }));
      console.log("query",this.user)
      
  return  this.user
  }catch(err){
    console.log("error al ingresar",err)
    return null
  }
}
async GetUserListFirebase(){
  console.log("test")
 try{
   const query=  await this.Firestore.firestore.collection(`users`).get()
     this.user =query.docs.map((doc:any)=> ({
      id_firebase: doc.id,
       ...doc.data()
     }));
     console.log("query",this.user)
     console.log("test",this.user)

 return  this.user
 }catch(err){
   console.log("error al ingresar",err)
   return null
 }
}


async UpdateUserFirebase(User:usuario){
  try{
    const query=  await this.Firestore.firestore.collection(`users`).doc(User.$key).update(
     {
      nombre: User.nombre,
      apellido: User.apellido,
      DNI: User.DNI,
      tipo: User.tipo,
     }
      );
  return  this.user
  }catch(err){
    console.log("error al Editar",err)
    return null
  }
 }
 async AddUserFirebase(User:usuario){
  try{
    const query=  await this.Firestore.firestore.collection(`users`).add(
     {
      nombre: User.nombre,
      apellido: User.apellido,
      DNI: User.DNI,
      tipo: User.tipo,
      contra: User.DNI
     }
      );
  return  this.user
  }catch(err){
    console.log("error al agregar",err)
    return null
  }
 }
 async DeleteUserFirebase(id:string){
  try{
  return  this.Firestore.firestore.collection(`users`).doc(id).delete()
  }catch(err){
    console.log("error al ingresar",err)
    return null
  }
 }
 
  async login(email:string, password:string){
    try{
      return await this.afauth.signInWithEmailAndPassword( email,password);
    }catch(err){
      console.log("error al ingresar",err)
      return null
    }
  }
  private errorMgmt(error: any) {
    console.log(error);
  }
}
