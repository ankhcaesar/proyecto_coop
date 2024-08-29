import styles from "./NvoUsrOlvClv.module.css"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import Header from "../../components/Header/Index"
import InputForm from "../../components/InputForm/Index"
import Botton from "../../components/Botton/Index"
import PopUp from "../../components/PopUp/Index"
import { useNavigate } from "react-router-dom"

function NvoUsrOlvClv() {


    const {
        pnvoUsrOlvClv,
        limpiarInputNvo,
        manejarCambiosInput,
        popUp, setPopUp,

        nombreyApellidoNvo, setNombreyApellidoNvo,
        cursoNvo, setCursoNvo,
        whatsappNvo, setWhatsappNvo,
        emailNvo, setEmailNvo,
        usuarioNvo, setUsuarioNvo,
        contrasenaNvo, setContrasenaNv,

        whatsappCc, setWhatsappCc,
        emailCc, setEmailCc,
        limpiarInputCc




    } = useContext(GlobalContext)

    /** nuevo usuario */
    const navigate = useNavigate();




    const manejarEnvioNvo = (e) => {
        e.preventDefault();

        let datosAEnviar = {
            nombreyApellidoNvo,
            cursoNvo,
            whatsappNvo,
            emailNvo,
            usuarioNvo,
            contrasenaNvo
        }
        /**aqui crearUsuario(datosAEnviar) */

        /** manejo del Popup hasta colocar base de datos, despues borrar y reemplazar con el codigo indicado antes de cerrar el ultimo section */

        setPopUp({
            show: true
        });

        setTimeout(() => {
            setPopUp({
                show: false,
                message: "",
                type: "",
                overlay: false,
                origen:""
            });
            navigate("/")
        }, 3000);



        limpiarInputNvo();
    }
    /** Cambio de clave */
    const manejarEnvioCc = (e) => {
        e.preventDefault();

        let datosAEnviar = {
            whatsappCc,
            emailCc,
        }
        /**aqui cambiocontraseña(datosAEnviar) */

        /** manejo del Popup hasta colocar base de datos, despues borrar y reemplazar con el codigo indicado antes de cerrar el ultimo section */
        setPopUp({
            show: true
        });

        limpiarInputCc();
    }


    /**para los nuevos ingresos */
    useEffect(() => {
        manejarCambiosInput("nombreyApellido", "");
        manejarCambiosInput("curso", "");
        manejarCambiosInput("whatsapp", "");
        manejarCambiosInput("email", "");
        manejarCambiosInput("usuario", "");
        manejarCambiosInput("contrasena", "");
    }, [])




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
                                value={nombreyApellidoNvo}
                                updatevalue={setNombreyApellidoNvo}
                                required={true}
                            />
                            <label>Curso</label>
                            <InputForm
                                name="curso"
                                placeholder="Ingresa tu curso"
                                type="text"
                                value={cursoNvo}
                                updatevalue={setCursoNvo}
                                required={true}
                            />

                            <label>Whastsapp</label>
                            <InputForm
                                name="whatsapp"
                                placeholder="Ingresa el nro de Whatsapp"
                                type="text"
                                value={whatsappNvo}
                                updatevalue={setWhatsappNvo}
                                required={true}
                            />

                            <label>Email</label>
                            <InputForm
                                name="email"
                                placeholder="Ingresa tu email"
                                type="email"
                                value={emailNvo}
                                updatevalue={setEmailNvo}
                                required={true}
                            />

                            <label>Usuario</label>
                            <InputForm
                                name="usuario"
                                placeholder="Ingresa tu usuario"
                                type="text"
                                value={usuarioNvo}
                                updatevalue={setUsuarioNvo}
                                required={true}
                            />

                            <label>Contraseña</label>
                            <InputForm
                                name="contrasena"
                                placeholder="Ingresa tu contraseña"
                                type="password"
                                autocomplete="current-password"
                                value={contrasenaNvo}
                                updatevalue={setContrasenaNv}
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
                                    onClick={limpiarInputNvo}
                                />
                            </div>
                        </form>
                    </div>
                    {popUp.show && <PopUp message={"Ingreso al Menu compras sin chequear login"} type={"ok"} origen={"NN"}/>}

                </section>

                /**seccion cambio de clave */
                :
                <section className={styles.ContainerCambioContraseña}>
                    <Header
                        titulo="Cambio de Contraseña"
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
                                    onClick={limpiarInputCc}
                                />
                            </div>
                        </form>
                    </div>
                    {popUp.show && <PopUp message={"revise su mail/whatsapp "} type={"att"} overlay={true} origen={"cambiocontrasena"}/>}
                </section>

            }

        </>
    )
}
export default NvoUsrOlvClv

