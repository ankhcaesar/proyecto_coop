import styles from "./Inicio.module.css"
import logo from "/Img/logo.svg"
import InputForm from "../../components/InputForm/Index"
import Botton from "../../components/Botton/Botton"
import { Link } from "react-router-dom";


function Inicio() {

function manejarEnvio(e){
    e.preventDefault();
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
                        name="usuario"
                        placeholder="Ingresa tu usuario..."
                        type="text"
                        required={true}
                    />
                    <label>Contraseña</label>
                    <InputForm
                        name="contraseña..."
                        placeholder="Ingresa tu contraseña"
                        type="password"
                        required={true}
                    />

                    <Botton
                    name="botonEnvio"
                    label="Ingresar"
                    type="submit"

                    />
                </form>
                <div className={styles.links}>
                    <Link > Nuevo usuario
                    </Link>
                    <Link > Olvide la contraseña
                    </Link>

                </div>

            </div>
        </section>
    )
}
export default Inicio