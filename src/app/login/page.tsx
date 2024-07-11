"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function Splash() {
  return (
    <div>
      <div className=" ">
        <Image src="/Group.png" alt="logo" width={400} height={400} />
      </div>
      <div>
        <div>
          <h1>LOGIN</h1>
        </div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" type="text" />
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
        <Link href="/login" className="underline">
          forgot Password?
        </Link>
        <p></p>
        <Button>Login</Button>
        <p>or</p>
        <Button>
          <Link href="/login">Register</Link>
        </Button>
      </div>
      <div>
        <div>
          <h1>REGISTER</h1>
        </div>
        <Label htmlFor="firstname">Firstname</Label>
        <Input id="firstname" type="text" />
        <Label htmlFor="lastname">Lastname</Label>
        <Input id="lastname" type="text" />

        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />

        <Label htmlFor="password">Password</Label>
        <Input id="password" type="text" />
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" type="text" />
        <Button>Login</Button>
      </div>
    </div>
  );
}
