import styles from "./NvoUsrOlvClv.module.css"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import Header from "../../components/Header/Index"
import InputForm from "../../components/InputForm/Index"
import Botton from "../../components/Botton/Index"
import PopUp from "../../components/PopUp/Index"
import PopUp2 from "../../components/PopUp2/Index"


function NvoUsrOlvClv() {


    const {
        pnvoUsrOlvClv,

        

        popUp, setPopUp,
        popUp2,
        limpiarPopUp,

        limpiarInput,

        nombreyapellido, setNombreyapellido,
                curso, setCurso,
                whatsapp, setWhatsapp,
                email, setEmail,
                usuario, setUsuario,
                contrasena, setContrasena,
                permiso,setPermiso,

        whatsappCc, setWhatsappCc,
        emailCc, setEmailCc,


        crearUsuario




    } = useContext(GlobalContext)

    /** seccion nuevo usuario */


    const manejarEnvioNvo = (e) => {
        e.preventDefault();

        let datosAEnviar = {
            
            nombreyapellido,
            curso,
            whatsapp,
            email,
            usuario,
            contrasena,
            permiso
        }
        crearUsuario(datosAEnviar)
        limpiarInput;
    }
    /** seccion Cambio de clave */
    const manejarEnvioCc = (e) => {
        e.preventDefault();

        let datosAEnviar = {
            whatsappCc,
            emailCc,
        }
        /**aqui cambiocontraseña(datosAEnviar) */

        setPopUp({
            show: true,
            type: "att",
            message: "Ingrese el codigo enviado",
            zeIndex: "98",
            from: "completo"
        });

        limpiarInput;
    }





    return (
        <>
            {pnvoUsrOlvClv === "NuevoUsuario" ?
                <section className={styles.ContainerNuevoUsuario}>
                    <Header
                        titulo="Nuevo Usuario"
                    />
                    <div className={styles.containerFormulario}>

                        <form
                            className={styles.formularioNuevoUsr}
                            onSubmit={manejarEnvioNvo}
                        >
                            <label>Nombre y apellido</label>
                            <InputForm
                                name="NombreyApellido"
                                placeholder="Ingresa tu nombre y apellido"
                                type="text"
                                value={nombreyapellido}
                                updatevalue={setNombreyapellido}
                                required={true}
                            />
                            <label>Curso</label>
                            <InputForm
                                name="curso"
                                placeholder="Ingresa tu curso"
                                type="text"
                                value={curso}
                                updatevalue={setCurso}
                                required={true}
                            />

                            <label>Whastsapp</label>
                            <InputForm
                                name="whatsapp"
                                placeholder="Ingresa el nro de Whatsapp"
                                type="text"
                                value={whatsapp}
                                updatevalue={setWhatsapp}
                                required={true}
                            />

                            <label>Email</label>
                            <InputForm
                                name="email"
                                placeholder="Ingresa tu email"
                                type="email"
                                value={email}
                                updatevalue={setEmail}
                                required={true}
                            />

                            <label>Usuario</label>
                            <InputForm
                                name="usuario"
                                placeholder="Ingresa tu usuario"
                                type="text"
                                value={usuario}
                                updatevalue={setUsuario}
                                required={true}
                            />

                            <label>Contraseña</label>
                            <InputForm
                                name="contrasena"
                                placeholder="Ingresa tu contraseña"
                                type="password"
                                autocomplete="current-password"
                                value={contrasena}
                                updatevalue={setContrasena}
                                required={true}
                            />

                            <div className={styles.containerBotones}>
                                <Botton
                                    name="botonEnvio"
                                    label="Registrar"
                                    type="submit"
                                />
                                <Botton
                                    name="limpiar"
                                    label="Limpiar"
                                    type="button"
                                    onClick={limpiarInput}
                                />
                            </div>
                        </form>
                    </div>

                </section>


                :

                /**seccion cambio de clave */
                <section className={styles.ContainerCambioContraseña}>
                    <Header
                        titulo="Cambio_de Contraseña"
                    />
                    <div className={styles.containerFormulario}>
                        <form
                            className={styles.formularioNuevoUsr}
                            onSubmit={manejarEnvioCc}
                        >
                            <label>Whastsapp</label>
                            <InputForm
                                name="whatsapp"
                                placeholder="Ingresa el nro de Whatsapp"
                                type="text"
                                value={whatsappCc}
                                updatevalue={setWhatsappCc}
                                required={true}
                            />

                            <label>Email</label>
                            <InputForm
                                name="email"
                                placeholder="Ingresa tu email"
                                type="email"
                                value={emailCc}
                                updatevalue={setEmailCc}
                                required={whatsappCc ? false : true}
                            />

                            <div className={styles.containerBotones}>
                                <Botton
                                    name="botonEnvio"
                                    label="Enviar"
                                    type="submit"
                                    destino=""
                                />

                                <Botton
                                    name="limpiar"
                                    label="Limpiar"
                                    type="button"
                                    onClick={limpiarInput}
                                />
                            </div>
                        </form>
                    </div>
                </section>

            }
            {popUp.show && <PopUp message={popUp.message} type={popUp.type} zeIndex={popUp.zeIndex} from={popUp.from} />}
            {popUp2.show && <PopUp2 message={popUp2.message} type={popUp2.type} zeIndex={popUp2.zeIndex} from={popUp2.from} />}

        </>
    )
}
export default NvoUsrOlvClv

