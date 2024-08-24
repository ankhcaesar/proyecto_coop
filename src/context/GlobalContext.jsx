import { createContext, useState } from "react"

export const GlobalContext = createContext();
function GlobalContextProvider({ children }) {

const [NvoUsrOlvClv, setNvoUsrOlvClv]= useState("")

    return (
        <GlobalContext.Provider value={
            {
                NvoUsrOlvClv, setNvoUsrOlvClv

            }
        }>
            {children}
        </GlobalContext.Provider>


    )
}
export default GlobalContextProvider