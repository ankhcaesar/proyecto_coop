import styles from "./InputForm.module.css"

function InputForm(props) {
    return (
        <>
            <input
                className={styles.form_text}
                placeholder={props.placeholder}
                type={props.type}
            />
        </>
    )
}
export default InputForm