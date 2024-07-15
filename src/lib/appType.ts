interface Message {
    id: number;
    message: string;
    messageType: 'sender' | 'receiver';
    profilePicture: string;
    timestamp: number; // Assuming timestamp is in milliseconds since epoch
  }