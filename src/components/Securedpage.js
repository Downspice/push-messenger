"use client"
import { signIn } from "next-auth/react";

export default function Securedpage({setSession}) {
    const userName = setSession && setSession.user?.name;
    
    return <button onClick={() => !userName ? signIn("keycloak") : window.location.href = "/Secured"} className="hover:text-blue-800">
        Secured Page
    </button>
}