import { createContext, useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import db from "../db/db"

/**errores formularios no usado aun

export const typeError = [
    "valueMissing",
    "typeMismatch",
    "tooShort",
    "tooLong",
    "patternMismatch",
];
export const messages = {
    /**igreso
    usuarioIng: {
        valueMissing: "Debe ingresar el usuario",
        tooShort: "el usuario ingresado es demasiado corto"
    },
    contraseñaIng: {
        valueMissing: "debe ingresar la contraseña",
        tooShort: "la contraseña ingresada es demasiado corta",
        tooLong: "la contraseña ingresada es demasiado larga"
    },

    /**nuevo usuario
    NombreyApellido: {
        valueMissing: "Debe ingresar su nombre y apellido",
        tooShort: "el nombre ingresado es demasiado corto"
    },
}
errores formularios no usado aun*/

export const GlobalContext = createContext();

/**base de datos */
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USUARIOS':
            return { ...state, usuarios: action.payload };
            break;
        case 'SET_ARTICULOS':
            return { ...state, articulos: action.payload };
            break;
        case 'SET_CATEGORIAS':
            return { ...state, categorias: action.payload };
            break;
        case 'SET_SUBCATEGORIAS':
            return { ...state, subcategorias: action.payload };
            break;
        case 'SET_LISTA_PRODUCTOS':
            return { ...state, lista_productos: action.payload };
            break;
        case 'SET_VENTAS':
            return { ...state, ventas: action.payload };
            break;
        case 'SET_HISTORIAL':
            return { ...state, historial: action.payload };
            break;

        case 'ERROR':
            return { ...state, error: action.payload };
            break;

        default:
            return state;
    }
};

const initialState = {
    usuarios: [],
    articulos: [],
    categorias: [],
    subcategorias: [],
    lista_productos: [],
    ventas: [],
    historial: [],
    error: [],
};
/**base de datos */


function GlobalContextProvider({ children }) {
    /**para la navegacion interna */
    const navigate = useNavigate();

    /**base de datos */
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const usuarios = await db.usuarios.toArray();
                dispatch({ type: 'SET_USUARIOS', payload: usuarios });
            } catch (error) {
                showError('error', 'Ocurrió un error al obtener los usuarios');
            }
        };

        const fetchArticulos = async () => {
            try {
                const articulos = await db.articulos.toArray();
                dispatch({ type: 'SET_ARTICULOS', payload: articulos });
            } catch (error) {
                showError('error', 'Ocurrió un error al obtener los articulos');
            }
        };

        const fetchCategorias = async () => {
            try {
                const categorias = await db.categorias.toArray();
                dispatch({ type: 'SET_CATEGORIAS', payload: categorias });
            } catch (error) {
                showError('error', 'Ocurrió un error al obtener las categorias');
            }
        };

        const fetchSubcategorias = async () => {
            try {
                const subcategorias = await db.subcategorias.toArray();
                dispatch({ type: 'SET_SUBCATEGORIAS', payload: subcategorias });
            } catch (error) {
                showError('error', 'Ocurrió un error al obtener las subcategorias');
            }
        };

        const fetchLista_productos = async () => {
            try {
                const lista_productos = await db.lista_productos.toArray();
                dispatch({ type: 'SET_LISTA_PRODUCTOS', payload: lista_productos });
            } catch (error) {
                showError('error', 'Ocurrió un error al obtener la lista de productos');
            }
        };

        const fetchVentas = async () => {
            try {
                const ventas = await db.ventas.toArray();
                dispatch({ type: 'SET_VENTAS', payload: ventas });
            } catch (error) {
                showError('error', 'Ocurrió un error al obtener las ventas');
            }
        };

        const fetchHistorial = async () => {
            try {
                const historial = await db.historial.toArray();
                dispatch({ type: 'SET_HISTORIAL', payload: historial });
            } catch (error) {
                showError('error', 'Ocurrió un error al obtener el historial de ventas');
            }
        };

        fetchUsuarios();
        fetchArticulos();
        fetchCategorias();
        fetchSubcategorias();
        fetchLista_productos();
        fetchVentas();
        fetchHistorial();
    }, []);
    /**base de datos */





    /**manejo de errores en la app */
    const showError = (type, message) => {
        setPopUp({ show: true, message: "", type: "error", zeIndex: "98", from: "MSJ" });
        setTimeout(() => {
            limpiarPopUp(1);
        }, 3000);
    };
    /**manejo de errores en la app */


    /** ingreso */
    const [usuarioIng, setUsuarioIng] = useState("")
    const [contrasenaIng, setContrasenaIng] = useState("")

    /**limpiar inputs usuario  ingreso */
    const limpiarInputIng = () => {
        setUsuarioIng("");
        setContrasenaIng("");
    };

    /**Nuevo usuario o cambiar clave*/



    /**crear usuario */
    const crearUsuario = async (datosAEnviar) => {
        let idnuevo = self.crypto.randomUUID();
        let permisoprovisorio = "usr";
        const data = {
            id_usr: idnuevo,
            nombreyapellido: datosAEnviar.nombreyapellido,
            curso: datosAEnviar.curso,
            whatsapp: datosAEnviar.whatsapp,
            email: datosAEnviar.email,
            usuario: datosAEnviar.usuario,
            contrasena: datosAEnviar.contrasena1,
            permiso: permisoprovisorio
        }


        try {
            const usuarioExistente = await db.usuarios.where('usuario').equals(data.usuario).toArray();

            // Verificar si el usuario ya existe
            if (usuarioExistente.length > 0) {
                showError('error', 'El nombre de usuario ya existe.');
                return;
            }
            // Agregar el usuario a la base de datos
            await db.usuarios.add(data);

            // Mostrar mensaje de éxito
            setPopUp({
                show: true,
                type: "success",
                message: "Usuario creado exitosamente",
                from: "MSJ"
            });
            setTimeout(() => {
                limpiarPopUp(1);
                navigate("/")
            }, 3000);

        } catch (error) {
            // Manejar errores
            console.error("Error al crear usuario:", error);
            setPopUp({
                show: true,
                type: "error",
                message: "Ocurrió un error al crear el usuario",
                from: "MSJ"
            });
            setTimeout(() => {
                limpiarPopUp(1);
            }, 3000);
        }
    };
    /**crear usuario */


    /** datos nuevo usuario */
    const [nombreyapellido, setNombreyapellido] = useState("")
    const [curso, setCurso] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [email, setEmail] = useState("")
    const [usuario, setUsuario] = useState("")
    const [contrasena, setContrasena,] = useState("")
    const [permiso, setPermiso] = useState("")


    /** limpiar imputs revisarlo*/
    const limpiarInput = () => {
        setNombreyapellido("");
        setCurso("");
        setWhatsapp("");
        setEmail("");
        setUsuario("");
        setContrasena("");
    };
    /** limpiar imputs */

    /** estado pagina nuevo usuario*/
    const [pnvoUsrOlvClv, setPnvoUsrOlvClv] = useState();


    /** Popup */
    const [popUp, setPopUp] = useState({ show: false, message: "", type: "", zeIndex: "", from: "" });
    /** Popup2 */
    const [popUp2, setPopUp2] = useState({ show: false, message: "", type: "", zeIndex: "", from: "" });
    const limpiarPopUp = (N) => {
        N === 1 ?
            setPopUp({
                show: false,
                message: "",
                type: "",
                from: "",
                zeIndex: ""
            })
            :
            setPopUp2({
                show: false,
                message: "",
                type: "",
                from: "",
                zeIndex: ""
            })
    }



    return (
        <GlobalContext.Provider value={

            {
                usuarioIng, setUsuarioIng,
                contrasenaIng, setContrasenaIng,

                limpiarInput,


                pnvoUsrOlvClv, setPnvoUsrOlvClv,

                popUp, setPopUp,
                popUp2, setPopUp2,
                limpiarPopUp,
                crearUsuario,


                nombreyapellido, setNombreyapellido,
                curso, setCurso,
                whatsapp, setWhatsapp,
                email, setEmail,
                usuario, setUsuario,
                contrasena, setContrasena,
                permiso, setPermiso,

                navigate,


                state, dispatch

            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider