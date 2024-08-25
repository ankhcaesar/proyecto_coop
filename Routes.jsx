import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./src/pages/Home/Index"
import Inicio from "./src/pages/Inicio/Index"
import E404 from "./src/pages/404/Index"
import CarritoCompras from "./src/pages/CarritoCompras/Index"
import Historial from "./src/pages/Historial/Index"
import MenuCompras from "./src/pages/MenuCompras/Index"
import NvoUsrOlvClv from "./src/pages/NvoUsrOlvClv/Index"


function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<Inicio />} />
                    <Route path="*" element={<E404 />} />
                    <Route path="/CarritoCompras" element={<CarritoCompras />} />
                    <Route path="/Historial" element={<Historial />} />
                    <Route path="/MenuCompras" element={<MenuCompras />    } />
                    <Route path="/NuevoUsuario" element={<NvoUsrOlvClv />} />
                    <Route path="/CambioClave" element={<NvoUsrOlvClv />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute