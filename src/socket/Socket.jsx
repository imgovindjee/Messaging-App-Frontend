import io from 'socket.io-client'
import { createContext, useContext, useMemo } from 'react'




const SocketContext = createContext()

const getSocket = () => useContext(SocketContext)

const SocketProvider = ({ children }) => {
    const socket = useMemo( () => {
        const ioSocket = io(import.meta.env.VITE_SERVER_DOMAIN, { withCredentials: true });
        return ioSocket;
    }, [])


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}


export { SocketProvider, getSocket }