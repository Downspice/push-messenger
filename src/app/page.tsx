import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Nav from "@/components/Nav";
import Image from "next/image";
import "@/styles/globals.css";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!!session) {
    redirect("/Secured");
  }
  return (
    <>
      <Nav />
      <div className="h-dvh ">
        <Image src="/Group.png" alt="logo" width={400} height={400} />
      </div>
    </>
  );
};

export default Home;
