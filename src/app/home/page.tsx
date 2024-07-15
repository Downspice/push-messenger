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
  function conn() {
    const centrifuge = new Centrifuge(
      "wss://smpp.stlghana.com/connection/websocket",
      {
        token:
          "65bcc0d4-3d68-455c-b6c1-168c8f20eb27",
      }
    );
    // Add HS256 Access Token for Authentication

    centrifuge
      .on("connecting", function (ctx) {
        console.log(`connecting: ${ctx.code}, ${ctx.reason}`);
      })
      .on("connected", function (ctx) {
        console.log(`connected over ${ctx.transport}`);
      })
      .on("disconnected", function (ctx) {
        console.log(`disconnected: ${ctx.code}, ${ctx.reason}`);
      })
      .connect();

    const sub = centrifuge.newSubscription("pingStats");

    sub
      .on("subscribing", function (ctx) {
        console.log(`subscribing: ${ctx.code}, ${ctx.reason}`);
      })
      .on("subscribed", function (ctx) {
        console.log("subscribed", ctx);
      })
      .on("unsubscribed", function (ctx) {
        console.log(`unsubscribed: ${ctx.code}, ${ctx.reason}`);
      })
      .on("error", function (ctx) {
        console.log("subscription error", ctx);
      })
      .subscribe();
  }

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: 1,
        message:
          "Message 1 from sender Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        messageType: "sender",
        profilePicture: "/profile.png",
        timestamp: Date.now() - 200, // Current timestamp in milliseconds
      },
      {
        id: 2,
        message: "Message 2 from sender Suspendisse felis vitae nunc imp",
        messageType: "sender",
        profilePicture: "/profile.png",
        timestamp: Date.now() - 10000, // Example timestamp, 10 seconds earlier
      },
      {
        id: 3,
        message: "Message 3 from sender Fusce quis ligula eu libero rutrum",
        messageType: "sender",
        profilePicture: "/profile.png",
        timestamp: Date.now() - 20000, // Example timestamp, 20 seconds earlier
      },
      {
        id: 4,
        message: "Message 1 from receiver Ut convallis est a dui venenatis",
        messageType: "receiver",
        profilePicture: "/profile.png",
        timestamp: Date.now() + 10000, // Example timestamp, 10 seconds later
      },
      {
        id: 5,
        message: "Message 2 from receiver Nullam sit amet magna in elit mollis",
        messageType: "sender",
        profilePicture: "/profile.png",
        timestamp: Date.now() + 20000, // Example timestamp, 20 seconds later
      },
      {
        id: 6,
        message:
          "Message 3 from receiver Pellentesque habitant morbi tristique senectus",
        messageType: "receiver",
        profilePicture: "/profile.png",
        timestamp: Date.now() + 30000, // Example timestamp, 30 seconds later
      },
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
    <div className="flex " suppressHydrationWarning={true}>
      {/* chats sidebar with fixed width */}
      <div className="w-64 h-full  bg-gray-200 ">
        <div className="w-64 fixed ">
          <div className="pt-3  flex items-center">
            <div className="py-3 grid col-span-1">
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
            <p> Messages</p>
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
      <div className="flex-1 h-dvh bg-gray-100 flex   flex-col">
        <div className="flex-1 overflow-y-auto content-end p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.messageType === "sender"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.messageType === "receiver" && (
                <div className="flex-shrink-0 mr-2">
                  <Image
                    src={message.profilePicture}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              )}
              <div
                className={`max-w-[50%] p-4 rounded-lg ${
                  message.messageType === "sender"
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <p>{message.message}</p>
              </div>
              {message.messageType === "sender" && (
                <div className="flex-shrink-0 ml-2">
                  <Image
                    src={message.profilePicture}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-white border-t p-4 flex items-center">
          <Textarea
            id="messageBox"
            style={{ resize: "none" }}
            placeholder="Type your message here."
            className="flex-1 mr-2"
          />
          <Button onClick={conn}>
            <PaperPlaneIcon className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
