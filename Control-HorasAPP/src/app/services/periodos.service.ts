
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
export class PeriodosService {
  periodo!:any

  constructor(public Firestore: AngularFirestore,private afauth:AngularFireAuth) {}

  async GetPeriodosListFirebase(){
   try{
     const query=  await this.Firestore.firestore.collection(`periodos`).get()
       this.periodo =query.docs.map((doc:any)=> ({
        id_firebase: doc.id, 
         ...doc.data()
       }));
       console.log("query",this.periodo)
   return  this.periodo
   }catch(err){
     console.log("error al obtener los periodos",err)
     return null
   }
  }
  async UpdatePeriodoFirebase(Periodo:carrera){
    try{
      const query=  await this.Firestore.firestore.collection(`periodos`).doc(Periodo.$key).update(
       {
        nombre: Periodo.nombre,
        sigla: Periodo.sigla,
        
       }
        );
    return  this.periodo
    }catch(err){
      console.log("error al Editar",err)
      return null
    }
   }
   async AddPeriodoFirebase(Periodo:periodo){
     console.log(Periodo,"thisones")
    try{
      const query=  await this.Firestore.firestore.collection(`periodos`).add(
       {
        fecha_INI:   Periodo.fecha_INI.toString(),
        fecha_INI_formated:     Periodo.fecha_INI_formated,
        fecha_FIN:     Periodo.fecha_FIN.toString(),
        fecha_FIN_formated:     Periodo.fecha_FIN_formated,
        Cant_Semanas: Periodo.Cant_Semanas 
       }
        );
    return  this.periodo
    }catch(err){
      console.log("error al agregar",err)
      return null
    }
   }
   async DeletePeriodoFirebase(id:string){
    console.log(id)
    try{
    return  this.Firestore.firestore.collection(`periodos`).doc(id).delete()
    }catch(err){
      console.log("error al ingresar",err)
      return null
    }
   }
   
    
}
