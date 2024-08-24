
import { Outlet } from "react-router-dom"
import Container from "../../components/Container/Index"


function Home (){

    return(
        <main>
        <Container>
            <Outlet/>
        </Container>    
        
        
        </main>
    )
}
export default Home