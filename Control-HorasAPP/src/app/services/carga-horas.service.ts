import { Injectable } from '@angular/core';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { carrera } from '../interfaces/carrera';
import { periodo } from '../interfaces/periodo';

@Injectable({
  providedIn: 'root'
})
export class CargaHorasService {
  CargaHoras!:any

  constructor(public Firestore: AngularFirestore,private afauth:AngularFireAuth) {}

  async GetCargaHorasListFirebase(){
   try{
     const query=  await this.Firestore.firestore.collection(`CargaHoras`).get()
       this.CargaHoras =query.docs.map((doc:any)=> ({
        id_firebase: doc.id, 
         ...doc.data()
       }));
       console.log("query",this.CargaHoras)
   return  this.CargaHoras
   }catch(err){
     console.log("error al obtener los cargas de horas",err)
     return null
   }
  }
  async GetCargaHorasAdminFirebase(){
    try{
      const query=  await this.Firestore.firestore.collection(`CargaHoras`).get()
        this.CargaHoras =query.docs.map((doc:any)=> ({
         id_firebase: doc.id, 
          ...doc.data()
        }));
        console.log("query",this.CargaHoras)
    return  this.CargaHoras
    }catch(err){
      console.log("error al obtener los cargas de horas",err)
      return null
    }
   }
  async UpdateCargaHorasFirebase(CargaHoras:any){
    try{
      const query=  await this.Firestore.firestore.collection(`CargaHoras`).doc(CargaHoras.$key).update(
       {
        nombre: CargaHoras.nombre,
        sigla: CargaHoras.sigla,
        
       }
        );
    return  this.CargaHoras
    }catch(err){
      console.log("error al Editar",err)
      return null
    }
   }
   async AddCargaHorasFirebase(CargaHoras:any){
     console.log(CargaHoras,"thisones")
    try{
      const query=  await this.Firestore.firestore.collection(`CargaHoras`).add(
       {
        fecha_INI:   CargaHoras.fecha_INI.toString(),
        fecha_INI_formated:     CargaHoras.fecha_INI_formated,
        fecha_FIN:     CargaHoras.fecha_FIN.toString(),
        fecha_FIN_formated:     CargaHoras.fecha_FIN_formated,
        Cant_Semanas: CargaHoras.Cant_Semanas 
       }
        );
    return  this.CargaHoras
    }catch(err){
      console.log("error al agregar",err)
      return null
    }
   }
   async DeleteCargaHorasFirebase(id:string){
    console.log(id)
    try{
    return  this.Firestore.firestore.collection(`CargaHoras`).doc(id).delete()
    }catch(err){
      console.log("error al ingresar",err)
      return null
    }
   }
   
    
}
