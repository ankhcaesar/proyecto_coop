import styles from "./Inicio.module.css"
import logo from "/Img/logo.svg"
import InputForm from "../../components/InputForm/Index"
import Botton from "../../components/Botton/Index"
import PopUp from "../../components/PopUp/Index"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import CryptoJS from 'crypto-js';
import db from "../../db/db"

function Inicio() {

    const { setPnvoUsrOlvClv,
        usuarioIng, setUsuarioIng,
        contrasenaIng, setContrasenaIng,
        limpiarInput,
        limpiarPopUp,
        navigate,

        popUp, setPopUp,

    } = useContext(GlobalContext)

    function manejarEnvio(e) {
        e.preventDefault();


        // Buscar el usuario en la base de datos
        db.usuarios.where('usuario').equals(usuarioIng).toArray().then(usuarios => {
            if (usuarios.length > 0) {
                const usuario = usuarios[0];
                const hashIngresado = CryptoJS.SHA256(contrasenaIng + 16).toString();

                if (hashIngresado === usuario.contrasena) {
                    navigate("/menucompras");
                } else {
                    setPopUp({
                        show: true,
                        type: "error",
                        message: "El usuario o la contraseña son incorrectos",
                        from: "MSJ"
                    });
                    setTimeout(() => {
                        limpiarPopUp(1);
                    }, 3000);
                }
            } else {
                setPopUp({
                    show: true,
                    type: "error",
                    message: "El usuario es incorrecto",
                    from: "MSJ"
                });
                setTimeout(() => {
                    limpiarPopUp(1);
                }, 3000);
            }

        });


        limpiarInput();
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
                    <div className={styles.botton}>
                        <Botton
                            name="botonEnvio"
                            label="Ingresar"
                            type="submit"
                        />
                    </div>

                </form>
                <div className={styles.links}>
                    <Link to="/NuevoUsuario" onClick={() => setPnvoUsrOlvClv("NuevoUsuario")}> Nuevo usuario
                    </Link>
                    <Link to="/CambioClave" onClick={() => setPnvoUsrOlvClv("CambioClave")}> Olvide la contraseña
                    </Link>
                </div>
            </div>
            {popUp.show && <PopUp message={popUp.message} type={popUp.type} zeIndex={popUp.zeIndex} from={popUp.from} />}
        </section>

    )
}
export default Inicio