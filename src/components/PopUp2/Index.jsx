import styles from "./PopUp2.module.css"
import iconError from "../../../public/Icons/exclamacion-rojo.svg"
import iconAtt from "../../../public/Icons/exclamacion-naranja.svg"
import iconOk from "../../../public/Icons/check.svg"
import InputForm from "../InputForm/Index"
import Botton from "../Botton/Index"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext"
import { useNavigate } from "react-router-dom"


function PopUp2({ message, type, overlay, origen }) {
    const navigate = useNavigate();
    const {
        nuevacontrasena, setNuevacontrasena,
        limpiarInputCc,
        setPopUp2,
        setPopUp

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

        setPopUp({
            show: false,
            message: "",
            type: "",
            overlay: false,
            origen: ""
        });

        setPopUp2({
            show: false,
            message: "",
            type: "",
            overlay: false,
            origen: ""
        });

        navigate("/")
        limpiarInputCc();
    }

    return (
        <>

            {origen === "codigoVerif" &&
                <div className={styles.overlay}>
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