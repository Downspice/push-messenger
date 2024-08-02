"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "@/components/Nav";
import Logout from "@/components/Logout";
import { useSession } from "next-auth/react";
import {
  getConnectionToken,
  getMessages,
  sendMessage,
} from "@/services/chatsApi";
import Centrifuge from "centrifuge";
import { Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function Splash() {
  const { data: session , status } = useSession();
  const accessToken = session?.accessToken ;

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      if (accessToken) {
        try {
          const token = await getConnectionToken(accessToken);
          setToken(token);
          setLoading(false);
        } catch (e) {
          toast({
variant: "destructive",

            title: "You submitted the following values:",
            description: `${e}`,
            type: "foreground",
            duration: 5000,
          });
          console.error("Error fetching token:", e);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchToken();
  }, [accessToken]);

  useEffect(() => {
    if (token && !loading) {
      const CENTRIFUGO__ACCESS_TOKEN: any = localStorage.getItem(
        "CENTRIFUGO_ACCESS_TOKEN"
      );
      const CENTRIFUGO__WEBSOCKET: any = localStorage.getItem(
        "CENTRIFUGO_WEBSOCKET"
      );

      const centrifuge = new Centrifuge(CENTRIFUGO__WEBSOCKET);
      centrifuge.setToken(CENTRIFUGO__ACCESS_TOKEN);

      centrifuge.on("connect", (ctx) => {
        console.log("connected", ctx);
      });

      centrifuge.subscribe("save", (ctx) => {
        console.log("This is the message received", ctx);
      });

      centrifuge.subscribe("downSitesMonitor", (ctx) => {
        console.log("Down sites from centrifugo", ctx);

        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setTimeout(() => {
              const notification = new Notification(" Message Received", {
                body: `${ctx.data.availability}`,
              });
              notification.addEventListener("show", (event) => {
                console.log("Notification shown", event);
              });
              notification.addEventListener("close", function (event) {
                console.log("Notification closed");
              });
            }, 1000);
          }
        });
      });

      centrifuge.subscribe("notification", (ctx) => {
        console.log("notification data from centrifugo server, dashboard", ctx);
      });

      centrifuge.subscribe("reminderChannel", (ctx) => {
        console.log("reminderChannel data from centrifugo server", ctx);
      });

      centrifuge.on("disconnect", (ctx) => {
        console.log("disconnected", ctx);
      });

      centrifuge.connect();
    }
  }, [token, loading]);

  async function log() {
    let messageBox = document.getElementById(
      "messageBox"
    ) as HTMLTextAreaElement;
    var message = messageBox.value;
    var message = message.trim();
    if (message != "") {
      console.log("Send message is: ", message);

      var sending: payload = {
        id: "70311703-358f-45a1-a207-0a53f3422387",
        message: message,
        senderId: `${session?.user?.email}`,
        receiverId: "7f38f730-3fc2-4a03-a0e5-ff464a004bf9",
        receiver: "Prince",
        sender: "Bryan",
        createdAt: "2024-07-16T12:59",
      };

      sendMessage(accessToken, message);
      message = " ";
    } else {
      console.log("message is empty");
    }
  }

  //get messages
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const accessToken = session?.accessToken;
        const response = await getMessages(accessToken);
        const data = await response.data;

        // Assuming your endpoint returns an array of messages
        const sortedMessages = data.sort(
          (a: Message, b: Message) => a.id - b.id
        );

        setMessages(sortedMessages);
      } catch (error) {
        toast({variant: "destructive",
          title: "You submitted the following values:",
          description: `${error}`,
          type: "foreground",
          duration: 5000,
        });
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [session?.accessToken]);

  //centrifugo connection

  // const { data: session, status } = useSession();
  // if(status != "authenticated"){

  //     console.log("status is ===", status);
  //     redirect(`${HOME}`)
  // }

  return (
    <div className="flex" suppressHydrationWarning={true}>
      {/* chats sidebar with fixed width */}
      <div className="w-64 h-full  bg-gray-200 ">
        <div className="w-64 fixed ">
          <div className="pt-3  flex items-center">
            <div className="py-3 grid col-span-1">
              <Image src="/profile.png" alt="logo" width={50} height={50} />
            </div>
            <div className="grid col-span-5">
              <div>Awer Joseph Kweku</div>
              <div>Desktop User</div>
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
                <div>you have no friends?</div>
                <div>Click below to add friends</div>
                <Button>ADD PUSH BUDDY</Button>
              </div>
            </div> */}
          </div>
          <div className=" border-1 border-border">
            <div> Messages</div>
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
                    <div>Joe</div>
                    <div>Last sent message</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right side taking up remaining space */}
      <div className="flex-1 h-dvh bg-gray-100 flex   flex-col">
        {/* <Nav/> */}
        <Logout setSession="{undefined}" />
        <div className="flex-1 overflow-y-auto content-end p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                // id of the sender
                message.senderId === "7f38f730-3fc2-4a03-a0e5-ff464a004bf9"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.messageType === "receiver" && (
                <div className="flex-shrink-0 mr-2">
                  <Image
                    src={"/profile.png"}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              )}
              <div
                className={`max-w-[50%] p-4 rounded-lg ${
                  // id of the sender
                  message.senderId === "7f38f730-3fc2-4a03-a0e5-ff464a004bf9"
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <div>{message.message}</div>
              </div>
              {message.senderId === "7f38f730-3fc2-4a03-a0e5-ff464a004bf9" && (
                <div className="flex-shrink-0 ml-2">
                  <Image
                    src={"/profile.png"}
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
          <Button onClick={log}>
            <PaperPlaneIcon className="mr-2 h-4 w-4" />
            Send
          </Button>
          {/* <Button onClick={connectToCentrifugo}>
            <PaperPlaneIcon className="mr-2 h-4 w-4" />
            centrifuge......
          </Button> */}
          {/* <Button onClick={showMessages}>
              <PaperPlaneIcon className="mr-2 h-4 w-4" />
              centrifuge......
            </Button> */}
        </div>
      </div>
    </div>
  );
}
