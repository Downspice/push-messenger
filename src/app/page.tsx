import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { authOptions } from './api/auth/[...nextauth]/route';
import Nav from '@/components/Nav';


const  Home = async () => {
  const session = await getServerSession(authOptions)
  if(!!session){
    redirect('/Secured')
  }
 return (
   <div>
      <Nav/>
     <h1 className="text-green-800 text-4xl flex justify-center pt-3">Welcome to the Homepage</h1>
   </div>
 );
};

export default Home;
