interface session {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?:string | null;
    accessToken?:string|null;
}
 
interface payload{
    id?: string | null;
    message:string | null;
    senderId: string | null;
    receiverId: string | null;
    receiver: string | null;
    sender: string | null;
    createdAt: string | null;
}

interface Message {
    id: number;
    message: string;
    messageType: 'sender' | 'receiver';
    profilePicture?: string;
    timestamp?: number; // Assuming timestamp is in milliseconds since epoch
    
    senderId?: string,
    receiverId?: string,
    receiver?: null,
    sender?: null
  }