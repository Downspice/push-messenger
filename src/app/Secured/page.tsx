"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
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
import { ArrowDownCircle, Save } from "lucide-react";
import { Container } from "react-floating-action-button";
import { toast } from "@/components/ui/use-toast";
import { setWSENDPOINT } from "@/utils/constants";
import { getAllUsers } from "@/services/user";

export default function Splash() {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  setWSENDPOINT();

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
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setTimeout(() => {
              const notification = new Notification(" Message Received", {
                body: `${ctx.data.message}`,
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

      centrifuge.subscribe("downSitesMonitor", (ctx) => {
        console.log("Down sites from centrifugo", ctx);
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
    const messageBox = document.getElementById(
      "messageBox"
    ) as HTMLTextAreaElement;
    const message = messageBox.value; 
    
    if (message != "") {
      console.log("Send message is: ", message);
      var sending: payload = {
        message: message,
        sender: `${session?.user?.name}`,
      }; 
      await sendMessage(accessToken, sending);
      messageBox.value = "";
    } else {
      console.log(messageBox.value, "message is empty");
    }
  }

  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("scroll works");
  };

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
        scrollToBottom();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "You submitted the following values:",
          description: `${error}`,
          type: "foreground",
          duration: 5000,
        });
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages().then(() => scrollToBottom());
  }, [session?.accessToken]);

  const [friendList, setFriendList] = useState<friend[]>([]);
  useEffect(() => {
    const fetchfriends = async () => {
      try {
        const token = session?.accessToken;
        const friends = await getAllUsers(token);
        setFriendList(friends);
      } catch (error) {
        console.error("this is an error when generating friend list", error);
      }
    };
    fetchfriends();
  }, [session?.accessToken]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchFriend = friendList.filter(
    (friend) =>
      friend.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex" suppressHydrationWarning={true}>
      {/* chats sidebar with fixed width */}
      <div className="w-64 h-full  bg-white   ">
        <div className="w-64 fixed overflow-y-scroll">
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
              type="text"
              id="messageBox"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for other users on PUSH"
            />
          </div>
          <div className=" border-1 border-border">
            <div> Messages</div>
          </div>
          <div>
            {searchQuery == "" ? (
              <div>
                {friendList.map((friend) => (
                  <div key={friend.id}>
                    <div className="flex items-center">
                      <Image
                        src="/profile.png"
                        alt="profile"
                        width="60"
                        height="60"
                      />
                    </div>
                    <div className="flex-1 pl-4">
                      <div>
                        {friend.lastName} {friend.firstName}
                      </div>
                      <div>Last sent message</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {searchFriend.map((searchResult) => (
                  <div key={searchResult.id}>
                    <div className="flex items-center">
                      <Image
                        src="/profile.png"
                        alt="profile"
                        width="60"
                        height="60"
                      />
                    </div>
                    <div className="flex-1 pl-4">
                      <div>
                        {searchResult.lastName} {searchResult.firstName}
                      </div>
                      <div>Last sent message</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Right side taking up remaining space */}
      <div className="flex-1 h-dvh backImage flex flex-col">
        {/* <Nav/> */}
        <Logout setSession="{undefined}" />
        <div className="flex-1 overflow-y-auto content-end p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                // id of the sender
                message.sender === `${session?.user?.name}`
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.sender !== `${session?.user?.name}` && (
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
                  message.sender === `${session?.user?.name}`
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <div>{message.message}</div>
              </div>
              {message.sender === `${session?.user?.name}` && (
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
          <div ref={messageEndRef} />
          <Container>
            <ArrowDownCircle
              className=" text-primary"
              onClick={() => scrollToBottom()}
            />
          </Container>
        </div>
        <div className="bg-white border-t p-4 flex items-center">
          <Textarea
            id="messageBox"
            style={{ resize: "none", maxHeight: "200px", overflowY: "auto" }}
            placeholder="Type your message here."
            className="flex-1 mr-2"
          />
          <Button onClick={log}>
            <PaperPlaneIcon className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
