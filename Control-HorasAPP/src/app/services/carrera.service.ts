import { Injectable } from '@angular/core';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { carrera } from '../interfaces/carrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  carrera!:any

  constructor(public Firestore: AngularFirestore,private afauth:AngularFireAuth) {}
  async GetCarreraListFirebase(){
   try{
     const query=  await this.Firestore.firestore.collection(`carreras`).get()
       this.carrera =query.docs.map((doc:any)=> ({
        id_firebase: doc.id, 
         ...doc.data()
       }));
  
   return  this.carrera
   }catch(err){
     console.log("error al ingresar",err)
     return null
   }
  }
  async UpdateCarreraFirebase(Carrera:carrera){
    try{
      const query=  await this.Firestore.firestore.collection(`carreras`).doc(Carrera.$key).update(
       {
        nombre: Carrera.nombre,
        sigla: Carrera.sigla,
        
       }
        );
    return  this.carrera
    }catch(err){
      console.log("error al Editar",err)
      return null
    }
   }
   async AddCarreraFirebase(Carrera:carrera){
    try{
      const query=  await this.Firestore.firestore.collection(`carreras`).add(
       {
        nombre: Carrera.nombre,
        sigla: Carrera.sigla
       }
        );
    return  this.carrera
    }catch(err){
      console.log("error al agregar",err)
      return null
    }
   }
   async DeleteCarreraFirebase(id:string){
    try{
    return  this.Firestore.firestore.collection(`carreras`).doc(id).delete()
    }catch(err){
      console.log("error al ingresar",err)
      return null
    }
   }
   
    
}
