"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

export default function Splash() {
  return (

    <div className="flex">
      {/* Left side with fixed width */}
      <div className="w-64 h-dvh bg-gray-200 p-4">
        Left Side Content


        <div className="w-64 bg-slate-300 ">
        <div className="pt-3  flex items-center">
          <div className="grid col-span-1">
            <Image src="/profile.png" alt="logo" width={50} height={50} />
          </div>
          <div className="grid col-span-5">
            <p>Awer Joseph Kweku</p>
            <p>Tablet User</p>
          </div>
        </div>
        <div className="">
          <Input
            id="search"
            type="text"
            placeholder="Search for other users on PUSH "
          ></Input>

          <div className="pb-7 grid grid-cols-1 place-items-center ">
            <div className="grid col-span-1">
              <Image
                src="/empty-for-friends.png"
                alt="empty-for-friends"
                width={400}
                height={400}
              />
            </div>
            <div>
              <p>you have no friends?</p>
              <p>Click below to add friends</p>
              <Button>ADD PUSH BUDDY</Button>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div className="">
            <div className="pt-3  flex items-center">
          <div className="grid col-span-1">
            <Image src="/profile.png"
                  alt="profile"
                  width="60"
                  height="60" />
          </div>
          <div className="grid col-span-5">
            <p>Joe</p>
            <p>Last sent message</p>
          </div>
        </div>
              
              
              
            </div>
          </div>
        </div>
      </div>




        
      </div>
      {/* Right side taking up remaining space */}
      <div className="flex-1 bg-gray-100 p-4">
        Right Side Content
        
        <div className="empty">
          <Image
            src="/empty-for-chats.png"
            width="500"
            height="400"
            alt="empty-for-chats"
          />


        <div className="receipient">
          <div>
            <h1>receipient</h1>
            <div>
              {" "}
              <Image src="/profile.png" alt="profile" width="60" height="60" />
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur sadipiscing elit.
                  Suspendisse felis vitae nunc imp
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="sender">
          <div>
            <h1>sender</h1>
            <div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur sadipiscing elit.
                  Suspendisse felis vitae nunc imp
                </p>
              </div>
              <div>
                <Image
                  src="/profile.png"
                  alt="profile"
                  width="60"
                  height="60"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


    // <div className="flex">
      
    //   {/* /* chat area */}
    //   <div className="empty flex justify-center items-center">
        
    //     </div>
        

    
    //   </div>
    // </div>
  );
}
