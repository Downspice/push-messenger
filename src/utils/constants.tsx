import { useSession } from "next-auth/react";

export function Access(){
    const { data: session, status } = useSession();
      var accessToken = session?.accessToken;
      localStorage.setItem("ACCESS", accessToken);
        return accessToken;
    }

export const API_ENDPOINT_BASE = "http://192.168.250.209:7300";
export const setWSENDPOINT=() =>{
    const WS_ENDPOINT:string = "wss://smpp.stlghana.com/connection/websocket";
    localStorage.setItem("CENTRIFUGO_WEBSOCKET", WS_ENDPOINT);
    return WS_ENDPOINT;
}

export const HOME = "http://localhost:3000";
