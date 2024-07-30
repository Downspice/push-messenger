"use client";
import federatedLogout from "../utils/federatedLogout";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Logout({ setSession }) {
  const userName = setSession && setSession.user?.name;
  const { data: session, status } = useSession();

  return (
    <div className="  flex justify-between bg-white border-b-grey  ">
      <div className="">{session?.user?.name}</div>
      <div className=" ">
        <Button onClick={() => federatedLogout()}>Logout {userName}</Button>
      </div>
    </div>
  );
}
