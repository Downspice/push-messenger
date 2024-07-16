"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession({ required: true });

  return (
    <main>
      <div>
        here we go!!!!
        <p>Welcome, {session?.user?.name}!</p>
        <p>Your email is: {session?.user?.email}</p>
      </div>
    </main>
  );
}
