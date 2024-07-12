import { useToast } from "@chakra-ui/react";
import { createContext } from "react";



export const CommonContextProvider = createContext({});

export const CommonContext = ({ children }) => {

    const toast = useToast()
    
    return (
        <>
            <CommonContextProvider.Provider value={{ toast }}>
                {children}
            </CommonContextProvider.Provider>
        </>
    )
}
