import styles from "./MenuCompras.module.css"
import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import Header from "../../components/Header/Index"
function MenuCompras() {

    const { } = useContext(GlobalContext)
    return (
        <>
            <Header
                titulo="Menú Compras"
            />
            
            <p>menucompras</p>
            <p>{ }</p>
        </>
    )
}
export default MenuCompras