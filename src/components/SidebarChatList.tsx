"use client";

import { pusherClient } from "@/libs/pusher";
import { chatHrefConstructor, toPusherKey } from "@/libs/utils";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import UnseenChatToast from "./UnseenChatToast";

interface SidebarChatListProps {
  friends: User[];
  sessionId: string;
}

interface ExtendedMessage extends Message {
senderImg:string
senderName:string
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends, sessionId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
  useEffect(()=>{
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`))
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`))
    const newFriendHandler = ()=>{
      router.refresh()

    }
    const chatHandler = (message:ExtendedMessage)=>{
      const shuldNotify = pathname !== `/dashboard/chat/${chatHrefConstructor(sessionId,message.senderId)}`
      if(!shuldNotify) return;

      //should be notify
      toast.custom((t)=> (
       <UnseenChatToast t={t} sessionId={sessionId} senderId={message.senderId} senderImg={message.senderImg} senderMessage={message.text} senderName={message.senderName}/>
      ))
      setUnseenMessages((prev)=> [...prev, message])
    }
    pusherClient.bind('new_message', chatHandler)
    pusherClient.bind('new_friend', newFriendHandler)
    return ()=>{
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`))
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`))
      pusherClient.unbind('new_message', chatHandler)
    pusherClient.unbind('new_friend', newFriendHandler)
    }
  },[pathname, sessionId, router])
  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => {
          !pathname.includes(msg.senderId);
        });
      });
    }
  },[unseenMessages]);
  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
          return unseenMsg.senderId === friend.id;
        }).length;
        return (
          <li key={friend.id}>
            <a
            className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
            >
              {friend.name}
              {unseenMessagesCount > 0 ? (
                <div className="bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center">
                  {unseenMessagesCount}
                </div>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChatList;
