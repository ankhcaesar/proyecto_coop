import { createContext, useState } from "react"

export const GlobalContext = createContext();
function GlobalContextProvider({ children }) {


    /** ingreso */
    const [usuarioIng, setUsuarioIng] = useState("")
    const [contrasenaIng, setContrasenaIng] = useState("")

    /**limpiar inputs usuario  ingreso */
    const limpiarInputIng = () => {
        setUsuarioIng("");
        setContrasenaIng("");
    };


    /**Nuevo usuario o cambiar clave */
    const [pnvoUsrOlvClv, setPnvoUsrOlvClv] = useState('')


    /**datos cambiar clave */

    const [whatsappCc, setWhatsappCc] = useState("")
    const [emailCc, setEmailCc] = useState("")
    const [codigoVerif, setcodigoVerif] = useState("")
    const [nuevacontrasena, setNuevacontrasena]= useState("")

    const limpiarInputCc = () => {
        setWhatsappCc("");
        setEmailCc("");
        setcodigoVerif("")
    };



    /** datos nuevo usuario */
    const [nombreyApellidoNvo, setNombreyApellidoNvo] = useState("")
    const [cursoNvo, setCursoNvo] = useState("")
    const [whatsappNvo, setWhatsappNvo] = useState("")
    const [emailNvo, setEmailNvo] = useState("")
    const [usuarioNvo, setUsuarioNvo] = useState("")
    const [contrasenaNvo, setContrasenaNv] = useState("")


    /**limpiar inputs nuevo usuario  */
    const limpiarInputNvo = () => {
        setNombreyApellidoNvo("");
        setCursoNvo("");
        setWhatsappNvo("");
        setEmailNvo("");
        setUsuarioNvo("");
        setContrasenaNv("");
    };


    /** Manejar Cambios en ingresos */
    const manejarCambiosInput = (name, value) => {
        switch (name) {
            /**datos nuevo usuario */
            case "nombreyApellido":
                setNombreyApellidoNvo(value);
                break;

            case "curso":
                setCursoNvo(value);
                break;

            case "whatsapp":
                setWhatsappNvo(value);
                break;

            case "email":
                setEmailNvo(value);
                break;

            case "usuario":
                setUsuarioNvo(value);
                break;

            case "contrasena":
                setContrasenaNv(value);
                break;

            /**datos de ingreso */
            case "usuarioIng":
                setUsuarioIng(value);
                break;

            case "contraseñaIng":
                setContrasenaIng(value);
                break;


            default:
                break;
        }
    };


    //* Popup */
    const [popUp, setPopUp] = useState({ show: false, message:"", type:"", overlay:false, origen:"" });
    
   //* Popup2 */
   const [popUp2, setPopUp2] = useState({ show: false, message:"", type:"", overlay:false, origen:"" });

   
    return (
        <GlobalContext.Provider value={

            {
                usuarioIng, setUsuarioIng,
                contrasenaIng, setContrasenaIng,
                limpiarInputIng,


                pnvoUsrOlvClv, setPnvoUsrOlvClv,

                popUp, setPopUp,
                popUp2, setPopUp2,



                nombreyApellidoNvo, setNombreyApellidoNvo,
                cursoNvo, setCursoNvo,
                whatsappNvo, setWhatsappNvo,
                emailNvo, setEmailNvo,
                usuarioNvo, setUsuarioNvo,
                contrasenaNvo, setContrasenaNv,
                limpiarInputNvo,
                manejarCambiosInput,


                whatsappCc, setWhatsappCc,
                emailCc, setEmailCc,
                codigoVerif, setcodigoVerif,
                nuevacontrasena, setNuevacontrasena,
                limpiarInputCc

            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider