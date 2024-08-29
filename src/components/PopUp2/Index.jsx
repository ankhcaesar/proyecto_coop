import styles from "./PopUp2.module.css"
import iconError from "../../../public/Icons/exclamacion-rojo.svg"
import iconAtt from "../../../public/Icons/exclamacion-naranja.svg"
import iconOk from "../../../public/Icons/check.svg"
import InputForm from "../InputForm/Index"
import Botton from "../Botton/Index"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext"
import { useNavigate } from "react-router-dom"


function PopUp2({ type, message, zeIndex, from }) {
    const navigate = useNavigate();
    const {
        nuevacontrasena, setNuevacontrasena,
        limpiarInputCc,

        setPopUp,
        limpiarPopUp,

    } = useContext(GlobalContext)



    /**manejo del icono */
    const [icon, setIcon] = useState("")
    useEffect(() => {
        const cambiaricono = (tipo) => {
            switch (tipo) {
                case "ok":
                    setIcon(iconOk)
                    break;

                case "error":
                    setIcon(iconError)
                    break;
                case "att":
                    setIcon(iconAtt)
                    break;

                default:
                    break;
            }
        }
        cambiaricono(type)
    }, [])

    /**seccion cambiocontraseña */
    const manejarEnvioIc = (e) => {
        e.preventDefault();
        let datosAEnviar = {
            nuevacontrasena
        }
        limpiarPopUp(2);

        setPopUp({
            show: true,
            type: "att",
            message: " contraseña cambiada con exito",
            from: "MSJ",
            zeIndex: "99"
        });
        setTimeout(() => {
            limpiarPopUp(1)
            navigate("/")
        }, 3000);
        limpiarInputCc();
    }

    return (
        <>

            {from === "codigoVerif" &&
                <div className={styles.overlay} style={{ zIndex: `${zeIndex}` }}>
                    <div className={styles.PopUpContainer}>
                        <img className={styles.icono} src={icon} alt={`icono de ${type}`} />
                        <p className={styles.mensaje}>{message}</p>
                        <form
                            className={styles.formularioCodigoVerif}
                            onSubmit={manejarEnvioIc}
                        >
                            <label>Codigo</label>
                            <InputForm
                                name="nuevaClave"
                                placeholder="Ingresa la contraseña"
                                type="password"
                                updatevalue={setNuevacontrasena}
                                required={false}
                            />
                            <InputForm
                                name="nuevaClave2"
                                placeholder="repite la contraseña"
                                type="password"
                                value={nuevacontrasena}
                                updatevalue={setNuevacontrasena}
                                required={true}
                            />
                            <div className={styles.botton}>
                                <Botton
                                    name="botonEnvio"
                                    label="Confirma"
                                    type="submit"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}
export default PopUp2