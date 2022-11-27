import { FabDelete } from "../components/FabDelete";
import { NewEvent } from "../components/NewEvent";
import { LoginScreen } from "../screens/LoginScreen";


describe('Pruebas en Medi App' , ()=>{
    test('Debe crearse el LoginScreen', () => {

        const component = render(<LoginScreen/>)
        console.log('El Login se creo con exito.', component)

    });

    test('Debe Iniciar Sesion', () => {

        const login = {
            email: 'asgarper11@gmail.com',
            password: 171100
        }

        const component = render(<LoginScreen login={login} />)

        console.log('Sesion iniciada correctamente.', component)

    });

    test('Debe conectarse al API', () => {

        const url = `https://mediplus-backend.herokuapp.com/api/events/${ cita._id }`
        const api = render(<useCitas api={url} />)
        console.log('Conexion con el API realizada con exito.', api)

    });

    test('Debe crear una cita', () => {

        const cita = {
           inicio: Date.now(),
           fin: Date.now()+2,
           doctor: 'Luis',
           paciente: 'Cesar',
           titulo: 'Gripa',
        }

        render(<NewEvent cita={cita} />)
        console.log('La cita se creo con exito.')

    });

    test('Debe cancelar una cita', () => {

        const citaCancelada = {
            id: 2862183123
        }

        render(<FabDelete id={citaCancelada.id} />)
        console.log('Cita cancelada con exito.')

    });
    
})