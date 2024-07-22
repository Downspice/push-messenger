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
import { useSession } from 'next-auth/react';
import { getConnectionToken, getMessages } from "./api";
import { redirect } from "next/navigation";
import { HOME } from "@/utils/constants";



export default function Splash() {
  //Axios call to send the data to the back-end

  // const [messages, setMessages] = useState<Message[]>([]);

  // useEffect(() => {
  //   const initialMessages: Message[] = [
  //     {
  //       id: 1,
  //       message:
  //         "Message 1 from sender Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //       messageType: "sender",
  //       profilePicture: "/profile.png",
  //       timestamp: Date.now() - 200, // Current timestamp in milliseconds
  //     },
  //     {
  //       id: 2,
  //       message: "Message 2 from sender Suspendisse felis vitae nunc imp",
  //       messageType: "sender",
  //       profilePicture: "/profile.png",
  //       timestamp: Date.now() - 10000, // Example timestamp, 10 seconds earlier
  //     },
  //     {
  //       id: 3,
  //       message: "Message 3 from sender Fusce quis ligula eu libero rutrum",
  //       messageType: "sender",
  //       profilePicture: "/profile.png",
  //       timestamp: Date.now() - 20000, // Example timestamp, 20 seconds earlier
  //     },
  //     {
  //       id: 4,
  //       message: "Message 1 from receiver Ut convallis est a dui venenatis",
  //       messageType: "receiver",
  //       profilePicture: "/profile.png",
  //       timestamp: Date.now() + 10000, // Example timestamp, 10 seconds later
  //     },
  //     {
  //       id: 5,
  //       message: "Message 2 from receiver Nullam sit amet magna in elit mollis",
  //       messageType: "sender",
  //       profilePicture: "/profile.png",
  //       timestamp: Date.now() + 20000, // Example timestamp, 20 seconds later
  //     },
  //     {
  //       id: 6,
  //       message:
  //         "Message 3 from receiver Pellentesque habitant morbi tristique senectus",
  //       messageType: "receiver",
  //       profilePicture: "/profile.png",
  //       timestamp: Date.now() + 30000, // Example timestamp, 30 seconds later
  //     },
  //   ];

  //   // Sort messages by timestamp (ascending)
  //   initialMessages.sort((a, b) => a.timestamp - b.timestamp);

  //   setMessages(initialMessages);
  // }, []);

  async function log() {
    var sending: payload = {
      id: "70311703-358f-45a1-a207-0a53f3422387",
      message: "Prince Amofah's message",
      senderId: "7f38f730-3fc2-4a03-a0e5-ff464a004bf9",
      receiverId: "7f38f730-3fc2-4a03-a0e5-ff464a004bf9",
      receiver: "Prince",
      sender: "Bryan",
      createdAt: "2024-07-16T12:59",
    };

    let messageBox = document.getElementById(
      "messageBox"
    ) as HTMLTextAreaElement;
    var message = messageBox.value;
    if (message.trim() != "") {
      console.log("Send message is:", message.trim());
      try {
        const response = await axios.post(
          "http://192.168.250.209:7300/api/v1/messages/create-message",
          sending
        );
        console.log("the payload is ::", response.data);
      } catch (e) {
        console.log("Thsi error happened", e);
      }

      message = " ";
    } else {
      console.log("message is empty");
    }
  }

  //this information is kept to keep the details about the session
  const { data: session, status } = useSession();
  //log the accessToken
  const log1=()=>{
    const { accessToken } = session;
    // console.log('Access token:', accessToken);
    // console.log("status is ===", status); 
    return getConnectionToken(accessToken);
  }

  //get messages
  const [messages, setMessages]=useState<Message[]>([])
  useEffect(()=>{
  const showMessages=async ()=>{
    const { accessToken } = session;
    const messages = await getMessages(accessToken);
    setMessages(messages)
    }
  })
  // //centrifugo connection
  // let centrifuge: Centrifuge | null = null;
  // const log1= async ()=>{
  //   const phones = await getConnectionToken();
  //   console.log("this is revenge..",phones )
  // }
  
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
                <div>Tablet User</div>
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
        <Logout setSession="{undefined}"/>
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
                  <div>{message.message}</div>
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
            <Button onClick={log1}>
              <PaperPlaneIcon className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
  );
}
