import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import Login from "./Login";
import Logout from "./Logout";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <div
      className={
        "w-full flex  sticky top-0 justify-end border-b-2 bg-gray-200/50  "
      }
    >
      {!session && <Login />}
      {!!session && <Logout setSession={session} />}
    </div>
  );
}
