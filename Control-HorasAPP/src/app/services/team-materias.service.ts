
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
   return  this.TeamMateria
   }catch(err){
     console.log("error al obtener los miembros del equipo",err)
     return null
   }
  }
  async AddTeamMembersListFirebase(TeamMember:any,local_data:any){
   try{
     const query=  await this.Firestore.firestore.collection(`MemberTeamMateria`).add(
      {
        ApellidoMiembro:TeamMember.ApellidoMiembro,
        DNI_miembro: TeamMember.DNI_miembro,
        NombreMiembro: TeamMember.NombreMiembro,
        ProfesorDNI: local_data.profesorDNI,
        ProfesorNya: local_data.profesorNya,
        PuestoMiembro: TeamMember.PuestoMiembro,
        materia_id: local_data.id_firebase,
        materia_name: local_data.nombre
      
       
      }
       );
   return  this.TeamMateria
   }catch(err){
     console.log("error al agregar",err)
     return null
   }
  }
  async UpdateTeamMembersListFirebase(TeamMember:any){
    try{
      const query=  await this.Firestore.firestore.collection(`MemberTeamMateria`).doc(TeamMember.id_firebase).update(
       {
        ApellidoMiembro:TeamMember.ApellidoMiembro,
        DNI_miembro: TeamMember.DNI_miembro,
        NombreMiembro: TeamMember.NombreMiembro,
        ProfesorDNI: TeamMember.ProfesorDNI,
        ProfesorNya: TeamMember.ProfesorNya,
        PuestoMiembro: TeamMember.PuestoMiembro,
        materia_id: TeamMember.materia_id,
        materia_name: TeamMember.materia_name
        
       }
        );
        return  this.TeamMateria
    }catch(err){
      console.log("error al Editar",err)
      return null
    }
   }
   async DeleteTeamMembersListFirebase(id:string){
   try{
   return  this.Firestore.firestore.collection(`MemberTeamMateria`).doc(id).delete()
   }catch(err){
     console.log("error al ingresar",err)
     return null
   }
  }
  
   

  
   
    
}
