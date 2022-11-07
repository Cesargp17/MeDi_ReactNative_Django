import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { CitasContext } from "../context/CitasContext"

export const useCitas = () => {
    const { Citas, crearCita, citaActiva, CitaActiva, borrarCita, actualizarCita, Usuario, setUsuario, Doctor, setDoctor, cargarUsuarios, usuarios, doctores, cargarCitas, cargarAreas, Areas, CitaUsuario, citasDelUsuario, eliminarUsuario, cargarRoles, Roles, actualizarUsuario, TodosLosUsuarios } = useContext( CitasContext );
    const { Usuario: Persona } = useContext( AuthContext );
    
    const onCreateNewCita = async( cita ) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
            body: JSON.stringify({ title: cita.title, notes: cita.notes, start: cita.start, end: cita.end, user: cita.user, doctor: cita.doctor })
        };

        try {
            await fetch(
                'https://mediplus-backend.herokuapp.com/api/events/', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            const evento = {
                                _id: data.evento.id, 
                                title: data.evento.title,
                                description: data.evento.notes,
                                start: new Date(data.evento.start),
                                end: new Date(data.evento.end),
                                paciente: cita.user,
                                doctor: cita.doctor

                            }
                            crearCita(evento)
                        });
                })
        }
        catch (error) {
            alert('Algo ha salido mal, reinicia la aplicación')
        }
    }

    const onLoadEvents = () => {

        const requestOptions = {
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
        };

        fetch('https://mediplus-backend.herokuapp.com/api/events/', requestOptions)
        .then((response) => response.json())
        .then((json) => {
            cargarCitas(json.eventos)
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const onSelectActiveCita = ( cita ) => {
        citaActiva( cita )
    }

    const onDeleteCita = async( cita ) => {

        const requestOptions = {
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
        };

        await fetch(`https://mediplus-backend.herokuapp.com/api/events/${ cita._id }`, requestOptions).then((json) => console.log(json));;

        borrarCita( cita )
    }
    
    const onUpdateCita = async( cita ) => {

        console.log(cita._id)
 
        const requestOptions = {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
            body: JSON.stringify({ title: cita.title, notes: cita.notes, start: cita.start, end: cita.end, user: cita.user, doctor: cita.doctor })
        };

        try {
            await fetch(
                `https://mediplus-backend.herokuapp.com/api/events/${ cita._id }`, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            console.log(data)
                            const evento = {
                                _id: data.evento.id, 
                                title: data.evento.title,
                                description: data.evento.notes,
                                start: new Date(data.evento.start),
                                end: new Date(data.evento.end),
                                paciente: cita.user,
                                doctor: cita.doctor

                            }
                            actualizarCita( evento )
                        });
                })
        }
        catch (error) {
            alert('Algo ha salido mal, reinicia la aplicación')
        }
    }

    const onLoadUsers = () => {

        fetch('https://mediplus-backend.herokuapp.com/api/events/usuarios')
        .then((response) => response.json())
        .then((json) => {
        cargarUsuarios(json.usuarios);
        })
        .catch((error) => {
          console.error(error);
        });
        // cargarUsuarios()
    }

    const onLoadAreas = () => {

        const requestOptions = {
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
        };

        fetch('https://mediplus-backend.herokuapp.com/api/areas/', requestOptions)
        .then((response) => response.json())
        .then((json) => {
        cargarAreas(json.areas);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const onLoadUserCitas = () => {

        const requestOptions = {
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
        };

        fetch('https://mediplus-backend.herokuapp.com/api/events/citas', requestOptions)
        .then((response) => response.json())
        .then((json) => {
        citasDelUsuario(json.citas);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const onDeleteUser = ( user ) => {

        const requestOptions = {
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
        };

        fetch(`https://mediplus-backend.herokuapp.com/api/users/${ user._id }`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            eliminarUsuario(user);
            alert('Usuario eliminado con éxito.')
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const onLoadRoles = () => {
        
        const requestOptions = {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
        };

        fetch('https://mediplus-backend.herokuapp.com/api/roles/', requestOptions)
        .then((response) => response.json())
        .then((json) => {
            cargarRoles(json.roles)
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const onUpdateUser = ( usuario ) => {
        console.log(usuario)
        const requestOptions = {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
            body: JSON.stringify({ name: usuario.name, rol: usuario.rol._id, area: usuario.area?._id })
        };

        fetch(`https://mediplus-backend.herokuapp.com/api/users/${usuario._id}`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            actualizarUsuario(usuario)
        })
        .catch((error) => {
          console.error(error);
        });

        // actualizarUsuario(usuario)
    }

    return {
        Citas, onCreateNewCita, onDeleteCita, onSelectActiveCita, CitaActiva, onUpdateCita, Usuario, setUsuario, Doctor, setDoctor, onLoadUsers, usuarios, doctores, onLoadEvents, onLoadAreas, Areas, CitaUsuario, onLoadUserCitas, onDeleteUser, onLoadRoles, Roles, onUpdateUser, TodosLosUsuarios
    }
}