import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { CitasContext } from "../context/CitasContext"

export const useCitas = () => {
    const { Citas, crearCita, citaActiva, CitaActiva, borrarCita, actualizarCita, Usuario, setUsuario, Doctor, setDoctor, cargarUsuarios, usuarios, doctores, cargarCitas, cargarAreas, Areas, CitaUsuario, citasDelUsuario, eliminarUsuario, cargarRoles, Roles, actualizarUsuario, TodosLosUsuarios, eliminarArea, agregarNuevaArea, eliminarRol, agregarNuevoRol } = useContext( CitasContext );
    const { Usuario: Persona } = useContext( AuthContext );
    
    const onCreateNewCita = async( cita ) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
            body: JSON.stringify({ title: cita.title, notes: cita.notes, start: cita.start, end: cita.end, user: cita.user, doctor: cita.doctor, status: cita.status })
        };

        try {
            await fetch(
                'https://mediplus-backend.herokuapp.com/api/events/', requestOptions)
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
                                doctor: cita.doctor,
                                status: data.evento.status
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

        console.log(cita)
 
        const requestOptions = {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
            body: JSON.stringify({ title: cita.title, notes: cita.notes, start: cita.start, end: cita.end, user: cita.user, doctor: cita.doctor, status: cita.status })
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
                                doctor: cita.doctor,
                                status: cita.status

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

    const onDeleteArea = ( area ) => {

        const obstaculo = doctores.find( doctor => doctor.area._id === area._id )

        if( obstaculo ){
            alert('No puedes eliminar esta area porque tiene doctores asignados');
            return;
        }

        const requestOptions = {
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
        };

        fetch(`https://mediplus-backend.herokuapp.com/api/areas/${ area._id }`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            eliminarArea(area)
            alert('Área eliminada con éxito.')
        })
        .catch((error) => {
          console.error(error);
        });


    }

    const onAddArea = (area) => {

        const requestOptions = {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
            body: JSON.stringify({ area: area })
        };

        fetch(`https://mediplus-backend.herokuapp.com/api/areas/`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            agregarNuevaArea(json.area);
            alert('Área agregada con éxito.')
        })
        .catch((error) => {
          console.error(error);
        });

        // agregarNuevaArea(area)
    }

    const onDeleteRol = (rol) => {

        const obstaculo = TodosLosUsuarios.find( user => user.rol._id === rol._id )

        if( obstaculo ){
            alert('No puedes eliminar este rol porque tiene usuarios asignados');
            return;
        }

        const requestOptions = {
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
        };

        fetch(`https://mediplus-backend.herokuapp.com/api/roles/${ rol._id }`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            eliminarRol(rol)
            alert('Área eliminada con éxito.')
        })
        .catch((error) => {
          console.error(error);
        });

        
    }

    const onAddRol = (rol) => {

        const requestOptions = {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json', 'x-token': Persona.token },
            body: JSON.stringify({ rol: rol })
        };

        fetch(`https://mediplus-backend.herokuapp.com/api/roles/`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            agregarNuevoRol(json.rol)
            alert('Área agregada con éxito.')
        })
        .catch((error) => {
          console.error(error);
        });

        // 
    }

    return {
        Citas, onCreateNewCita, onDeleteCita, onSelectActiveCita, CitaActiva, onUpdateCita, Usuario, setUsuario, Doctor, setDoctor, onLoadUsers, usuarios, doctores, onLoadEvents, onLoadAreas, Areas, CitaUsuario, onLoadUserCitas, onDeleteUser, onLoadRoles, Roles, onUpdateUser, TodosLosUsuarios, onDeleteArea, onAddArea, onDeleteRol, onAddRol
    }
}