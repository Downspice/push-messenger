"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";


export default function Login() {
  function log() {
    signIn("keycloak");
  }

  return <Button onClick={log}>Login </Button>;
}
