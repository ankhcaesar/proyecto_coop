import styles from "./Botton.module.css"

function Botton(props) {
    return (

        <button
            className={styles.boton}
            type={props.type}
        >{props.label}
        </button>


    )
}
export default Botton