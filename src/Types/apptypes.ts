interface session {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?:string | null;
 
}
 
interface payload{
    id: string | null;
    message:string | null;
    senderId: string | null;
    receiverId: string | null;
    receiver: string | null;
    sender: string | null;
    createdAt: string | null;
}