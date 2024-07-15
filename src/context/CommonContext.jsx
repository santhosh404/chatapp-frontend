import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";



export const CommonContextProvider = createContext({});

export const CommonContext = ({ children }) => {

    const navigate = useNavigate();
    const toast = useToast()
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState({});

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        setUser(userInfo);
    }, [])

    return (
        <>
            <CommonContextProvider.Provider value={{ toast, user, selectedChat, setUser, setSelectedChat }}>
                {children}
            </CommonContextProvider.Provider>
        </>
    )
}
