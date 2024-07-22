'use client'
import federatedLogout from "../utils/federatedLogout";
import { Button } from "@/components/ui/button";


export default function Logout({ setSession }) {  
  const userName = setSession && setSession.user?.name;

  return (
    <Button
      onClick={() => federatedLogout()}
    >
      Logout {userName}
        </Button>
    
  );
}