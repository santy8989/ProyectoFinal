import { Injectable } from '@angular/core';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { usuario } from '../interfaces/usuario';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  user!:any;

  constructor(public Firestore: AngularFirestore,private afauth:AngularFireAuth) {}
 
 async AuthWithFirebase(DNI:number){
  try{
    const query=  await this.Firestore.firestore.collection(`users`).where("DNI","==",DNI).get()
      this.user =query.docs.map((doc:any)=> ({
       id_firebase: doc.id,
        ...doc.data()
      }));
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
  
}
