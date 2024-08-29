import styles from "./PopUp.module.css"
import iconError from "../../../public/Icons/exclamacion-rojo.svg"
import iconAtt from "../../../public/Icons/exclamacion-naranja.svg"
import iconOk from "../../../public/Icons/check.svg"
import InputForm from "../InputForm/Index"
import Botton from "../Botton/Index"
import PopUp2 from "../PopUp2/Index"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext"

function PopUp({ message, type, overlay, origen }) {
    const {
        codigoVerif, setcodigoVerif,
        limpiarInputCc,
        popUp2,
        setPopUp2,

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
    const manejarEnvioCc = (e) => {
        e.preventDefault();
        let datosAEnviar = {
            codigoVerif
        }
        /**aqui chequear codigoverif(datosAEnviar) */

        setPopUp2({ show: true })






        limpiarInputCc();
    }

    return (
        <>

            {origen === "NN" &&
                <div className={styles.PopUpContainer}>
                    <img className={styles.icono} src={icon} alt={`icono de ${type}`} />
                    <p className={styles.mensaje}>{message}</p>
                </div>
            }

            {origen === "cambiocontrasena" &&
                <div className={styles.overlay}>
                    <div className={styles.PopUpContainer}>
                        <img className={styles.icono} src={icon} alt={`icono de ${type}`} />
                        <p className={styles.mensaje}>{message}</p>
                        <form
                            className={styles.formularioCodigoVerif}
                            onSubmit={manejarEnvioCc}
                        >
                            <label>Codigo</label>
                            <InputForm
                                name="codigoVerif"
                                placeholder="Ingresa el codigo"
                                type="text"
                                value={codigoVerif}
                                updatevalue={setcodigoVerif}
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
                    {popUp2.show && <PopUp2 message={"Ingrese la nueva contraseña"} type={"att"} overlay={true} origen={"codigoVerif"} />}

                </div>
            }
        </>
    )
}
export default PopUp


/*
 * 
*/