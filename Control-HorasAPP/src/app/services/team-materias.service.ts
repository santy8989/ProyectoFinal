
import { Injectable } from '@angular/core';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class TeamMateriasService {
  TeamMateria!:any

  constructor(public Firestore: AngularFirestore,private afauth:AngularFireAuth) {}

  async GetTeamMembersListFirebase(nameMateria:string){
   try{
     const query=  await this.Firestore.firestore.collection(`MemberTeamMateria`).where("materia_name","==",nameMateria).get()
       this.TeamMateria =query.docs.map((doc:any)=> ({
        id_firebase: doc.id, 
         ...doc.data()
       }));
       console.log("query",this.TeamMateria)
   return  this.TeamMateria
   }catch(err){
     console.log("error al obtener los miembros del equipo",err)
     return null
   }
  }
  
   

  
   
    
}
