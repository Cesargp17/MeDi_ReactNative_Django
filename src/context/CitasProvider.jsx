import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthContext';
import { CitasContext } from './CitasContext'

export const CitasProvider = ({ children }) => {

    const año = 2022;
    const mes = 9;
    const dia = 25;
    const hora = 9;
    const minutos = 30;
    

    const [Citas, setCitas] = useState(
        [
            // {
            //     _id: 1,
            //     title: "Cita de cardiología",
            //     description: "Cita para el paciente Gilberto Banda en cardiología",
            //     start: new Date(año, mes, dia, hora, minutos),
            //     end: new Date(2022, 9, 25, 11, 30),
            //     doctor: 'Nadia Adaile',
            //     paciente: 'Gilberto Banda',
            //     area: 'Cardiologia'
            //   },          
        ]
    );
    const [CitaActiva, setCitaActiva] = useState('Vacio');
    const [Usuario, setUsuario] = useState('Vacio');
    const [Doctor, setDoctor] = useState('Vacio');
    const [usuarios, setUsuarios] = useState([]);
    const [doctores, setDoctores] = useState([]);
    const [Areas, setAreas] = useState('Vacio');
    const [Roles, setRoles] = useState('Vacio');
    const [TodosLosUsuarios, setTodosLosUsuarios] = useState('Vacio')

    const { Usuario: User } = useContext(AuthContext);
    const [CitaUsuario, setCitaUsuario] = useState('Vacio');


    const cargarUsuarios = ( usuarios = [] ) => {
        const doctor = usuarios.filter( usuario => usuario.rol.rol === 'Doctor' );
        const usuario = usuarios.filter( u => u.rol.rol !== 'Doctor' );
        setDoctores(doctor)
        setUsuarios(usuario)
        setTodosLosUsuarios(usuarios)
    }

    const cargarCitas = ( citas ) => {

        const agregarCitas = [];

        for ( let i = 0; i <= citas?.length; i++ ){
            if( citas[i] === undefined ){
                break;
            }

            const cita = {
                _id: citas[i].id,
                title: citas[i].title,
                description: citas[i].notes,
                start: new Date(citas[i].start),
                end: new Date(citas[i].end),
                doctor: citas[i].doctor,
                paciente: citas[i].user
            }
            agregarCitas.push(cita)
        }
        setCitas(agregarCitas)
    }

    const citasDelUsuario = ( citasDelUsuario ) => {
        setCitaUsuario( citasDelUsuario )
    }
    
    const crearCita = ( cita ) => {

        setCitas([...Citas, cita])
        alert('Cita creada correctamente')
    };
    
    const citaActiva = ( cita ) => {
        setCitaActiva( cita )
    };
    
    const borrarCita = ( cita ) => {
        const citas = Citas.filter( c => c._id !== cita._id);
        setCitas(citas)
        alert('Cita eliminada correctamente')
    };

    const actualizarCita = ( cita ) =>{
        const citas = Citas.filter( c =>c._id !== cita._id );
        setCitas([...citas, cita])
        alert('Cita actualizada correctamente')
    }

    const cargarAreas = ( areas ) => {
        setAreas(areas)
    }

    const eliminarUsuario = ( user ) => {
        const users = usuarios.filter( usuario => usuario._id !== user._id )
        setTodosLosUsuarios(users)
    }
    
    const cargarRoles = ( roles ) => {
        setRoles(roles)
    }

    const actualizarUsuario = ( user ) => {
        const nuevosUsuarios = TodosLosUsuarios.filter( usuario => usuario._id !== user._id )
        setTodosLosUsuarios([...nuevosUsuarios, user]);
        alert('Usuario actualizado con éxito');
    }

  return (
    <CitasContext.Provider value={{ Citas: Citas, crearCita, citaActiva, CitaActiva: CitaActiva, borrarCita, actualizarCita, Usuario, setUsuario, Doctor, setDoctor, cargarUsuarios, usuarios, doctores, cargarCitas, cargarAreas, Areas, CitaUsuario, citasDelUsuario, eliminarUsuario, cargarRoles, Roles, actualizarUsuario, TodosLosUsuarios }}>
        { children }
    </CitasContext.Provider>
  )
}
