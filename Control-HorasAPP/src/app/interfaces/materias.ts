export interface materia {
  $key?: string;
  nombre: string;
  carrera: string;
  profesorDNI: number;
  encargadoDNI: number;
  encargadoNya:string;
  profesorNya:string
  cantHoras: number;
}

//TODO: analizar la posibilidad de agregar 
//profesorDNI: string; 
//profesorNya: string; 
//encargadoDNI: string; 
//encargadoNya: string; 
// informacion redundante pero que agilizaria la lectura a costo de tener esto en cuenta en la escritura
//ready