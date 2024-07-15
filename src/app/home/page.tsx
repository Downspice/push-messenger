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
import { Centrifuge } from "centrifuge";
import { useEffect, useState } from "react";


export default function Splash() {
  
    const [messages, setMessages] = useState<Message[]>([]);
  
    useEffect(() => {
      const initialMessages: Message[] = [
        {
          id: 1,
          message: 'Message 1 from sender Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          messageType: 'sender',
          profilePicture: '/profile.png',
          timestamp: Date.now() // Current timestamp in milliseconds
        },
        {
          id: 2,
          message: 'Message 2 from sender Suspendisse felis vitae nunc imp',
          messageType: 'sender',
          profilePicture: '/profile.png',
          timestamp: Date.now() - 10000 // Example timestamp, 10 seconds earlier
        },
        {
          id: 3,
          message: 'Message 3 from sender Fusce quis ligula eu libero rutrum',
          messageType: 'sender',
          profilePicture: '/profile.png',
          timestamp: Date.now() - 20000 // Example timestamp, 20 seconds earlier
        },
        {
          id: 4,
          message: 'Message 1 from receiver Ut convallis est a dui venenatis',
          messageType: 'receiver',
          profilePicture: '/profile.png',
          timestamp: Date.now() + 10000 // Example timestamp, 10 seconds later
        },
        {
          id: 5,
          message: 'Message 2 from receiver Nullam sit amet magna in elit mollis',
          messageType: 'sender',
          profilePicture: '/profile.png',
          timestamp: Date.now() + 20000 // Example timestamp, 20 seconds later
        },
        {
          id: 6,
          message: 'Message 3 from receiver Pellentesque habitant morbi tristique senectus',
          messageType: 'receiver',
          profilePicture: '/profile.png',
          timestamp: Date.now() + 30000 // Example timestamp, 30 seconds later
        }
      ];

    // Sort messages by timestamp (ascending)
    initialMessages.sort((a, b) => a.timestamp - b.timestamp);

    setMessages(initialMessages);
  }, []);





  const log = () => {
    let messageBox = document.getElementById(
      "messageBox"
    ) as HTMLTextAreaElement;
    var message = messageBox.value;
    if (message.trim() != "") {
      console.log("Send message is:", message.trim());
      messageBox.value = " ";
    } else {
      console.log("message is empty");
    }
  };

  return (
    <div className="flex suppressHydrationWarning">
      {/* chats sidebar with fixed width */}
      <div className="w-64 h-full relative bg-gray-200 ">
        <div className="w-64 fixed ">
          <div className="pt-3  flex items-center">
            <div className="grid col-span-1">
              <Image src="/profile.png" alt="logo" width={50} height={50} />
            </div>
            <div className="grid col-span-5">
              <p>Awer Joseph Kweku</p>
              <p>Tablet User</p>
            </div>
          </div>
          <div className="px-2 pb-4">
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
          <div className="messageSection">
            {/* <Image
            src="/empty-for-chats.png"
            width="500"
            height="400"
            alt="empty-for-chats"
          /> */}

            
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.messageType === "sender" ? "sender" : "receipient"
                  }
                >
                  <div className="pt-3 gap-1 place-items-end">
                    <div
                      className={`flex items-center justify-${
                        message.messageType === "sender" ? "end" : "start"
                      }`}
                    >
                      {message.messageType === "sender" ? (
                        <>
                          
                          <div className="rounded-lg py-2 px-4 bg-[#D9D9D9] max-w-[50%]">
                            <p>{message.message}</p>
                          </div>
                          <div className="ml-2 self-start">
                            <img
                              src={message.profilePicture}
                              alt="profile"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          </div>
                        </>
                      ) : (
                        <><div className="ml-2 self-start">
                            <img
                              src={message.profilePicture}
                              alt="profile"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          </div>
                          <div className="rounded-lg py-2 px-4 bg-[#346EA2] max-w-[50%]">
                            <p>{message.message}</p>
                          </div>
                          
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            
          </div>

          <div className="border-input sticky bottom-0 bg-white border-t-1 p-2  flex gap-1">
            <Textarea id="messageBox" style={{resize:'none' }} placeholder="Type your message here." />
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
