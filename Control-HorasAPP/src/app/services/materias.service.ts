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
       console.log("query",this.materia)
       console.log("test",this.profesor)
       this.materia.forEach( (element: any) => {
         console.log("profesor",element)
         this.user(element).then(response => {
           if(this.profesor.length>0){
            element.profesorNya=this.profesor[0].nombre+" "+ this.profesor[0].apellido
           }else{
            element.profesorNya="Profesor invalido"
           }
           if(this.encargado.length>0){
            element.encargadoNya=this.encargado[0].nombre+" "+ this.encargado[0].apellido
           }else{
            element.encargadoNya="Encargado invalido"
           }

         
         
        }, error => {
          console.error("tuve un Error" + error)
    
        })

         
         
       })

  
   return  this.materia
   }catch(err){
     console.log("error al ingresar",err)
     return null
   }
  }
  async user(element:any){
    try{
      const  query1 = await this.Firestore.firestore.collection(`users`).where("DNI","==",element.profesorDNI).get()
      this.profesor =query1.docs.map((doc2:any)=> ({
       id_firebase: doc2.id,
        ...doc2.data()
      }));
      const  query2 = await this.Firestore.firestore.collection(`users`).where("DNI","==",element.encargadoDNI).get()
      this.encargado =query2.docs.map((doc2:any)=> ({
       id_firebase: doc2.id,
        ...doc2.data()
      }));
      console.log("naiz",this.profesor)
    }
    catch{

    }
  }

  async UpdateFacultadFirebase(Materia:materia){
    try{
      const query=  await this.Firestore.firestore.collection(`materias`).doc(Materia.$key).update(
       {
        nombre: Materia.nombre,
        facultad: Materia.carrera,
        profesor: Materia.profesor,
        admin: Materia.admin,
        cantHoras: Materia.cantHoras,
       
      
        
       }
        );
    return  this.materia
    }catch(err){
      console.log("error al Editar",err)
      return null
    }
   }
   async AddFacultadFirebase(Materia:materia){
     console.log(Materia,"thisones")
    try{

      const query=  await this.Firestore.firestore.collection(`materias`).add(
       {
        nombre: Materia.nombre,
        facultad: Materia.carrera,
        profesor: Materia.profesor,
        admin: Materia.admin,
        cantHoras: Materia.cantHoras,
       

       }
        );
    return  this.materia
    }catch(err){
      console.log("error al agregar",err)
      return null
    }
   }
   async DeleteFacultadFirebase(id:string){
    try{
    return  this.Firestore.firestore.collection(`materias`).doc(id).delete()
    }catch(err){
      console.log("error al ingresar",err)
      return null
    }
   }
  }