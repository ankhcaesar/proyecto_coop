import styles from "./Inicio.module.css"
import logo from "/Img/logo.svg"
import InputForm from "../../components/InputForm/Index"
import Botton from "../../components/Botton/Index"
import PopUp from "../../components/PopUp/Index"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";


function Inicio() {

    const navigate = useNavigate();
    const { setPnvoUsrOlvClv,

        usuarioIng, setUsuarioIng,
        contrasenaIng, setContrasenaIng,
        limpiarInputIng,
        manejarCambiosInput,

        popUp

    } = useContext(GlobalContext)

    function manejarEnvio(e) {
        e.preventDefault();

        let datosAEnviar = {
            usuarioIng,
            contrasenaIng 
    }
    navigate("/menucompras")
    /**aqui enviar datos login(datosAEnviar) */
    limpiarInputIng();

    }


    return (
        <section className={styles.containerPrincipal}>
            <div className={styles.containerLogo}>
                <div className={styles.logo}>
                    <img src={logo} alt="Logo cooperativa" />
                </div>
                <div className={styles.nombre}>
                    <h3>Unidad de</h3>
                    <h3>Abastecimiento</h3>
                </div>

            </div>
            <div className={styles.containerFormulario}>
                <form
                    className={styles.formulario}
                    onSubmit={manejarEnvio}
                >
                    <label>Nombre de usuario</label>
                    <InputForm
                        name="usuarioIng"
                        placeholder="Ingresa tu usuario"
                        type="text"
                        value={usuarioIng}
                        updatevalue={setUsuarioIng}
                        required={true}
                    />
                    <label>Contraseña</label>
                    <InputForm
                        name="contraseñaIng"
                        placeholder="Ingresa tu contraseña"
                        value={contrasenaIng}
                        updatevalue={setContrasenaIng}
                        type="password"
                        autocomplete="current-password"
                        required={true}
                    />


                        <Botton
                            name="botonEnvio"
                            label="Ingresar"
                            type="submit"
                        />
                    
                </form>
                <div className={styles.links}>
                    <Link to="/NuevoUsuario" onClick={() => setPnvoUsrOlvClv("NuevoUsuario")}> Nuevo usuario
                    </Link>
                    <Link to="/CambioClave" onClick={() => setPnvoUsrOlvClv("CambioClave")}> Olvide la contraseña
                    </Link>

                </div>

            </div>
            
        </section>
    )
}
export default Inicio


