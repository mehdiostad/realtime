interface User {
  name: string;
  email: string;
  image: string;
  id: string;
}



interface Message {
  id:string
  senderId: string
  receiveId: string
  text:string
  timestamp: number
}

interface Chat {
  id: string
  messages: Message[]
}

interface FriendRequest{
  id: string
  sendeerId: string
  receiverId: string
}