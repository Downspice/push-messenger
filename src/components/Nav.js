import React from "react";
import { getServerSession } from 'next-auth'
import { authOptions } from '../app/api/auth/[...nextauth]/route'
import { signIn,signOut } from "next-auth/react";
import Login from "./Login";
import Logout from "./Logout";
import Securedpage from "./Securedpage";

export default async function Nav() {
  const session = await getServerSession(authOptions)

 return ( 
  
   
     <div className={"w-full  top-0  flex-1 flex-wrap "}>
       <section className="x-auto">
         <nav className="flex justify-between bg-gray-200 text-blue-800 w-screen">
           <div className="px-5 xl:px-12 py-6 flex w-full items-center">
             <h1 className="text-3xl font-bold font-heading">
               Keycloak Next AUTH.
             </h1>
             <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
               <li>
                 <a className="hover:text-blue-800" href="/">
                   Home
                 </a>
               </li>
               <li>
                 <Securedpage setSession={session}/>
               </li>
             </ul>
             <div className="hidden xl:flex items-center space-x-5">
               <div className="hover:text-gray-200">
                 {!session && (
                   <Login />
                 )}
                 {!!session && (
                   <Logout setSession={session} />
                 )}
               </div>
             </div>
           </div>
         </nav>
       </section>
     </div>
  
 
 );

};