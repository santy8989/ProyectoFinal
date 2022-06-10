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
  facultad!:any

  constructor(public Firestore: AngularFirestore,private afauth:AngularFireAuth) {}
  async GetFacultadListFirebase(){
   try{
     const query=  await this.Firestore.firestore.collection(`facultades`).get()
       this.facultad =query.docs.map((doc:any)=> ({
        id_firebase: doc.id, 
         ...doc.data()
       }));
       console.log("query",this.facultad)
       console.log("test",this.facultad)
  
   return  this.facultad
   }catch(err){
     console.log("error al ingresar",err)
     return null
   }
  }
  async UpdateCarreraFirebase(Facultad:carrera){
    try{
      const query=  await this.Firestore.firestore.collection(`facultades`).doc(Facultad.$key).update(
       {
        nombre: Facultad.nombre,
        sigla: Facultad.sigla,
        
       }
        );
    return  this.facultad
    }catch(err){
      console.log("error al Editar",err)
      return null
    }
   }
   async AddCarreraFirebase(Facultad:carrera){
     console.log(Facultad,"thisones")
    try{
      const query=  await this.Firestore.firestore.collection(`facultades`).add(
       {
        nombre: Facultad.nombre,
        sigla: Facultad.sigla
       }
        );
    return  this.facultad
    }catch(err){
      console.log("error al agregar",err)
      return null
    }
   }
   async DeleteCarreraFirebase(id:string){
    try{
    return  this.Firestore.firestore.collection(`facultades`).doc(id).delete()
    }catch(err){
      console.log("error al ingresar",err)
      return null
    }
   }
   
    
}
