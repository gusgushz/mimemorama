import { Text, View, ScrollView, Button } from 'react-native';
import { colors } from '../styles/globalStyles';
import { Alumno, Profesor } from '../models/Clases';
import { useState } from 'react';

const alumnoInicial: Alumno = { asignaturas: [], calificacionGeneral: 0, concluirPrueba: () => {} };
const profesorInicial: Profesor = {
  calificar: () => {},
  registroDeAlumnos: [],
};
const asignaturaInicial = { pruebas: [], calificacionGeneral: 0 };
const pruebaInicial = { id: '', nombre: '', calificacion: 0, haConcluido: false };

export default function NewScreen() {
  const [profesor, setProfesor] = useState<Profesor>(profesorInicial);
  const [agregados, setAgregados] = useState('');
  const [agregados2, setAgregados2] = useState('');
  const [agregados3, setAgregados3] = useState('');

  const registrarAlumno = () => {
    const newAlumno = { ...alumnoInicial, asignaturas: [] };
    const updatedRegistroDeAlumnos = [...profesor.registroDeAlumnos, newAlumno];

    setProfesor({
      ...profesor,
      registroDeAlumnos: updatedRegistroDeAlumnos,
    });
  };

  const agregarAsignatura = () => {
    const updatedRegistroDeAlumnos = profesor.registroDeAlumnos.map(alumno => {
      const updatedAsignaturas = alumno.asignaturas || [];
      if (updatedAsignaturas.length === 0) {
        updatedAsignaturas.push({ ...asignaturaInicial, pruebas: [{ ...pruebaInicial }] });
      } else {
        updatedAsignaturas[0].pruebas = [...updatedAsignaturas[0].pruebas, { ...pruebaInicial }];
      }

      return {
        ...alumno,
        asignaturas: updatedAsignaturas,
      };
    });

    setProfesor({
      ...profesor,
      registroDeAlumnos: updatedRegistroDeAlumnos,
    });

    setAgregados('Asignatura agregada a los alumnos');
  };

  const agregarExamen = () => {
    const updatedRegistroDeAlumnos = profesor.registroDeAlumnos.map(alumno => {
      const updatedAsignaturas =
        alumno.asignaturas && alumno.asignaturas.length > 0
          ? alumno.asignaturas.map(asignatura => {
              const updatedPruebas = [...asignatura.pruebas, { ...pruebaInicial, nombre: 'Nuevo Examen' }];
              return {
                ...asignatura,
                pruebas: updatedPruebas,
              };
            })
          : [{ pruebas: [{ ...pruebaInicial, nombre: 'Nuevo Examen' }], calificacionGeneral: 0 }];

      return {
        ...alumno,
        asignaturas: updatedAsignaturas,
      };
    });

    setProfesor({
      ...profesor,
      registroDeAlumnos: updatedRegistroDeAlumnos,
    });

    setAgregados2('Examen asignado');
  };

  const concluirExamen = (alumnoId: number, pruebaIndex: number) => {
    const updatedRegistroDeAlumnos = profesor.registroDeAlumnos.map((alumno, id) => {
      if (id === alumnoId) {
        const updatedAsignaturas = alumno.asignaturas.map(asignatura => {
          const updatedPruebas = asignatura.pruebas.map((prueba, index) => {
            if (index === pruebaIndex) {
              const calificacionAleatoria = Math.floor(Math.random() * 101);
              return {
                ...prueba,
                haConcluido: true,
                calificacion: calificacionAleatoria,
              };
            }
            return prueba;
          });

          return {
            ...asignatura,
            pruebas: updatedPruebas,
          };
        });

        return {
          ...alumno,
          asignaturas: updatedAsignaturas,
        };
      }
      return alumno;
    });

    setProfesor({
      ...profesor,
      registroDeAlumnos: updatedRegistroDeAlumnos,
    });

    setAgregados2(''); // Clear the "Examen asignado" message
  };

  const promediarCalificaciones = () => {
    let sumaCalificaciones = 0;
    let cantidadExamenesConcluidos = 0;

    profesor.registroDeAlumnos.forEach(alumno => {
      alumno.asignaturas.forEach(asignatura => {
        asignatura.pruebas.forEach(prueba => {
          if (prueba.haConcluido) {
            sumaCalificaciones += prueba.calificacion;
            cantidadExamenesConcluidos += 1;
          }
        });
      });
    });

    if (cantidadExamenesConcluidos > 0) {
      const promedio = sumaCalificaciones / cantidadExamenesConcluidos;
      setAgregados3(promedio.toString());
      return promedio;
    } else {
      return 0;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ height: 'auto', backgroundColor: colors.background }}>
        <Text style={{ color: 'white' }}>Profesor</Text>
        <Button title="Registrar alumno" onPress={registrarAlumno} />
        <Button title="Agregar Asignatura" onPress={agregarAsignatura} />
        <Button title="Agregar examen" onPress={agregarExamen} />
        <Button title="Promediar calificaciones" onPress={promediarCalificaciones} />
        <Text>{agregados}</Text>
        <Text>{agregados2}</Text>
        <Text>{agregados3}</Text>
      </View>
      <View style={{ height: 'auto', backgroundColor: colors.background }}>
        <Text style={{ color: 'white' }}>Alumno</Text>
        {profesor.registroDeAlumnos.map((alumno, alumnoIndex) => (
          <View key={alumnoIndex} style={{ flexDirection: 'column' }}>
            <Text>Alumno {alumnoIndex}</Text>
            {alumno.asignaturas.map((asignatura, asignaturaIndex) => (
              <View key={asignaturaIndex}>
                {asignatura.pruebas.map((prueba, pruebaIndex) => (
                  <View key={pruebaIndex}>
                    <Text>
                      {prueba.haConcluido ? (
                        <Text>Calificación: {prueba.calificacion}</Text>
                      ) : (
                        <Text>Examen Pendiente</Text>
                      )}
                    </Text>
                    <Button title="Concluir examen" onPress={() => concluirExamen(alumnoIndex, pruebaIndex)} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
