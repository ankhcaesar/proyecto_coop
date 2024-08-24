import styles from "./Component.module.css"

function Component({ children }) {
    return (
        <section className={styles.containerContainer}>
            {children}
        </section>
    )
}
export default Component