"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { EnvelopeOpenIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import {Centrifuge} from "centrifuge";

export default function Splash() {
// Use WebSocket transport endpoint.
const centrifuge = new Centrifuge('wss://smpp.stlghana.com/connection/websocket');
centrifuge.setToken("DA8FD7E9A9F5DC952F03C6EBDC37BD91F39B28635722AC978438287CB929DB34D90B34A7F1421612181CC652932771A7F037A829C0B596BF7B8CE5528278783C")
// Allocate Subscription to a channel.
const sub = centrifuge.newSubscription('news');



centrifuge.on("connect",  function (connection :any) {
  console.log("connected")
})

centrifuge.on("disconnect",  function (connection : any) {
  console.log("disconnected", connection)
})

centrifuge.subscribe("downClientsMonitor", function (connection : any){
  console.log(connection.data);
})




  const log =()=>console.log("x"); 
  
  return (
    <div className="flex">
      {/* Left side with fixed width */}
      <div className="w-64 h-dvh bg-gray-200 ">
        <div className="w-64 ">
          <div className="pt-3  flex items-center">
            <div className="grid col-span-1">
              <Image src="/profile.png" alt="logo" width={50} height={50} />
            </div>
            <div className="grid col-span-5">
              <p>Awer Joseph Kweku</p>
              <p>Tablet User</p>
            </div>
          </div>
          <div className="pb-4">
            <Input
              id="search"
              type="text"
              placeholder="Search for other users on PUSH "
            ></Input>

            {/* <div className="pb-7 grid grid-cols-1 place-items-center ">
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
            </div> */}
          </div>
          <div className=" border-1 border-border">
            <p>Messages</p>
          </div>

          <div>
            <div>
              <div className="">
                <div className="pt-3  flex items-center">
                  <div className="grid col-span-1">
                    <Image
                      src="/profile.png"
                      alt="profile"
                      width="60"
                      height="60"
                    />
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
      <div className="flex-1 content-end bg-gray-100">
        <div className="empty">
          {/* <Image
            src="/empty-for-chats.png"
            width="500"
            height="400"
            alt="empty-for-chats"
          /> */}

          <div className="receipient">
            <div className="pt-3 gap-1 place-items-end">
              <div className="flex items-center justify-start">
                <div className="ml-2">
                  <Image
                    src="/profile.png"
                    alt="profile"
                    width="60"
                    height="60"
                  />
                </div>
                <div className=" rounded-full py-2 px-4 bg-[#346EA2] max-w-[50%]">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur sadipiscing elit.
                    Suspendisse felis vitae nunc imp
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 pb-4 sender">
            <div className="pt-3 gap-1 place-items-end">
              <div className="flex items-center justify-end">
                {" "}
                {/* Added justify-end to align items to the right */}
                <div className="rounded-full py-2 px-4 bg-[#D9D9D9] max-w-[50%]">
                  {" "}
                  {/* Adjusted width to max-w-[50%] */}
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse felis vitae nunc imp
                  </p>
                </div>
                <div className="ml-2">
                  {" "}
                  {/* Added ml-2 for margin-left */}
                  <Image
                    src="/profile.png"
                    alt="profile"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-input bg-white border-t-1 p-2  flex gap-1">
            <Textarea placeholder="Type your message here." />
            <Button onClick={log}>
              {" "}
              <PaperPlaneIcon className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
