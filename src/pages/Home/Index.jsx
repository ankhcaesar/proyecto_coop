import { Outlet } from "react-router-dom"
import Container from "../../components/Container/Index"
import GlobalContextProvider from "../../context/GlobalContext"
import SyncService from "../../SyncService"

function Home() {

    return (
        <main>
            <GlobalContextProvider>
                <Container>
                    <Outlet />
                    <SyncService/>

                </Container>
            </GlobalContextProvider>
        </main>
    )
}
export default Home