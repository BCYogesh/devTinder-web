import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

const createSocketConnection = () => {
    return io(BASE_URL, {
        withCredentials: true,
        transports: ['websocket'],
    });
}

export default createSocketConnection;
