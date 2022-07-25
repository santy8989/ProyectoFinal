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
    return  this.CargaHoras
    }catch(err){
      console.log("error al obtener los cargas de horas",err)
      return null
    }
   }
   async GetCargaHorasProfeFirebase(dni:string){
    try{
      const query=  await this.Firestore.firestore.collection(`CargaHoras`).where("profesorDNI","==",dni).get()
        this.CargaHoras =query.docs.map((doc:any)=> ({
         id_firebase: doc.id, 
          ...doc.data()
        }));
    return  this.CargaHoras
    }catch(err){
      console.log("error al obtener los cargas de horas",err)
      return null
    }
   }
   async GetCargaHorasByEncargadoFirebase(dni:string){
    try{
      const query=  await this.Firestore.firestore.collection(`CargaHoras`).where("encargadoDNI","==",dni).get()
        this.CargaHoras =query.docs.map((doc:any)=> ({
         id_firebase: doc.id, 
          ...doc.data()
        }));
    return  this.CargaHoras
    }catch(err){
      console.log("error al obtener los cargas de horas",err)
      return null
    }
   }
  async UpdateAprobadoCargaHorasFirebase(id:string,aprobadoValue:boolean){
    try{
      const query=  await this.Firestore.firestore.collection(`CargaHoras`).doc(id).update(
       {
        aprobado:aprobadoValue
       }
        );
    return  this.CargaHoras
    }catch(err){
      console.log("error al Editar",err)
      return null
    }
   }
   async UpdateAbonadoCargaHorasFirebase(id:string,abonadoValue:boolean){
    try{
      const query=  await this.Firestore.firestore.collection(`CargaHoras`).doc(id).update(
       {
        abonado:abonadoValue
       }
        );
    return  this.CargaHoras
    }catch(err){
      console.log("error al Editar",err)
      return null
    }
   }
   async AddCargaHorasFirebase(CargaHoras:any){
    try{
      const query=  await this.Firestore.firestore.collection(`CargaHoras`).add(
       {
        periodo:CargaHoras.periodo,
        materia:CargaHoras.materia,
        profesional:CargaHoras.profesional,
        cargo:CargaHoras.cargo,
        cantHoras:CargaHoras.cantHoras,
        periodoFormated:CargaHoras.periodoFormated,
        encargadoDNI:CargaHoras.encargadoDNI,
        encargadoNya:CargaHoras.encargadoNya,
        profesionalNya:CargaHoras.profesionalNya,
        profesorDNI:CargaHoras.profesorDNI,
        aprobado:false,
        abonado:false
       }
        );
    return  this.CargaHoras
    }catch(err){
      console.log("error al agregar",err)
      return null
    }
   }
   async DeleteCargaHorasFirebase(id:string){
    try{
    return  this.Firestore.firestore.collection(`CargaHoras`).doc(id).delete()
    }catch(err){
      console.log("error al ingresar",err)
      return null
    }
   }
   
    
}
