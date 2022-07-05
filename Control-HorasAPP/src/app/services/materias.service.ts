import { Injectable } from '@angular/core';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { materia } from '../interfaces/materias';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  materia!:any
  profesor!:any
  encargado!:any

  constructor(public Firestore: AngularFirestore,private afauth:AngularFireAuth) {}
  async GetMateriaListFirebase(){
    var test
    var cont=0
   try{
     const query=  await this.Firestore.firestore.collection(`materias`).get()
       this.materia =query.docs.map((doc:any)=> ({
        id_firebase: doc.id, 
         ...doc.data()
       }))
   return  this.materia
   }catch(err){
     console.log("error al ingresar",err)
     return null
   }
  }
  async GetMateriaFirebase(name:string){
   
   try{
     const query=  await this.Firestore.firestore.collection(`materias`).where("nombre","==",name).get()
       this.materia =query.docs.map((doc:any)=> ({
        id_firebase: doc.id, 
         ...doc.data()
       }))
   return  this.materia
   }catch(err){
     console.log("error al ingresar",err)
     return null
   }
  }
  // async user(element:any){
  //   try{
  //     const  query1 = await this.Firestore.firestore.collection(`users`).where("DNI","==",Number(element.profesorDNI)).get()
  //     this.profesor =query1.docs.map((doc2:any)=> ({
  //      id_firebase: doc2.id,
  //       ...doc2.data()
  //     }));
  //     const  query2 = await this.Firestore.firestore.collection(`users`).where("DNI","==",Number(element.encargadoDNI)).get()
  //     this.encargado =query2.docs.map((doc2:any)=> ({
  //      id_firebase: doc2.id,
  //       ...doc2.data()
  //     }));
  //     console.log("naiz",this.profesor)
  //   }
  //   catch{

  //   }
  // }
// deprecado
  async UpdateMateriaFirebase(Materia:materia){
    try{
      const query=  await this.Firestore.firestore.collection(`materias`).doc(Materia.$key).update(
       {
        nombre: Materia.nombre,
        carrera: Materia.carrera,
        profesorDNI: Materia.profesorDNI,
        encargadoDNI: Materia.encargadoDNI,
        profesorNya: Materia.profesorNya,
        encargadoNya: Materia.encargadoNya,
        cantHoras: Materia.cantHoras,
       }
        );
    return  this.materia
    }catch(err){
      console.log("error al Editar",err)
      return null
    }
   }
   async AddMateriaFirebase(Materia:materia){
     console.log("materia en service", Materia)
    try{

      const query=  await this.Firestore.firestore.collection(`materias`).add(
       {
        nombre: Materia.nombre,
        carrera: Materia.carrera,
        profesorDNI: Materia.profesorDNI,
        encargadoDNI: Materia.encargadoDNI,
        profesorNya: Materia.profesorNya,
        encargadoNya: Materia.encargadoNya,
        cantHoras: Materia.cantHoras,
       }
        );
    return  this.materia
    }catch(err){
      console.log("error al agregar",err)
      return null
    }
   }
   async DeleteMateriaFirebase(id:string){
     console.log("naseh",id)
    try{
    return  this.Firestore.firestore.collection(`materias`).doc(id).delete()
    }catch(err){
      console.log("error al ingresar",err)
      return null
    }
   }
  }