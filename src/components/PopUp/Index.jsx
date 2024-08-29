import styles from "./PopUp.module.css"
import iconError from "../../../public/Icons/exclamacion-rojo.svg"
import iconAtt from "../../../public/Icons/exclamacion-naranja.svg"
import iconOk from "../../../public/Icons/check.svg"
import InputForm from "../InputForm/Index"
import Botton from "../Botton/Index"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext"

function PopUp({ type, message, zeIndex, from }) {
    const {
        codigoVerif, setcodigoVerif,
        limpiarInputCc,
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

        setPopUp2({
            show: true,
            from: "codigoVerif",
            type: "att",
            message: " Ingrese el codigo"
        });
        limpiarInputCc();
    }

    return (
        <>
            {from === "MSJ" &&
                <div className={styles.PopUpContainer} style={{ zIndex: `${zeIndex}` }}>
                    <img className={styles.icono} src={icon} alt={`icono de ${type}`} />
                    <p className={styles.mensaje}>{message}</p>
                    <span className={styles.loader}></span>
                </div>
            }

            {from === "cambiocontrasena" &&
                <div className={styles.overlay}>
                    <div className={styles.PopUpContainer} style={{ zIndex: `${zeIndex}` }}>

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
                </div>
            }
        </>
    )
}
export default PopUp