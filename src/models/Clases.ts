export interface Profesor {
  calificar: () => void; //solo se va a calificar si la prueba ha concluido.
  registroDeAlumnos: Alumno[];
}
export interface Alumno {
  asignaturas: Asignatura[];
  calificacionGeneral: number; //promedio de todas las pruebas
  concluirPrueba: () => void;
}
export interface Asignatura {
  pruebas: Prueba[];
  calificacionGeneral: number; //promedio de todas las pruebas
}
export interface Prueba {
  id: string; //cadena de caracteres
  nombre: string;
  calificacion: number;
  haConcluido: boolean;
}
