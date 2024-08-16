"use client";
import federatedLogout from "../utils/federatedLogout";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Logout({ setSession }) {
  const userName = setSession && setSession.user?.name;
  const { data: session, status } = useSession();

  return (
    <div className=" glass sticky top-0 flex justify-between  ">
      <div className="">{session?.user?.name}</div>
      <div>
        
      </div>
      <div className=" ">
        <Button onClick={() => federatedLogout()}>Logout {userName}</Button>
      </div>
    </div>
  );
}
