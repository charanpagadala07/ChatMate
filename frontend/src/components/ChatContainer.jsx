import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from '../components/ChatHeader';
import MessageInput from '../components/MessageInput';
import MessageSkeleton from '../components/skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
    const {messages, isMessagesLoading, getMessages, selectedUser, subscribeToMessages, unsubscribeFromMessages} = useChatStore();
    const {authUser} = useAuthStore();
    const messagesEndRef = useRef(null)

    useEffect(()=>{
        console.log("Fetching messages for:", selectedUser._id);
        getMessages(selectedUser._id);

        console.log("Subscribing to messages...");
        subscribeToMessages();

        return () =>{
            unsubscribeFromMessages();
            console.log("Unsubscribing from messages...");
        }
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);



    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])



    if(isMessagesLoading) return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    )

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.map((message)=>(
                <div
                key={message._id}
                className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                ref={messagesEndRef}
                >
                    <div className='chat-image avatar'>
                        <div className='size-10 rounded-full border'>
                            <img
                             src={message.senderId === authUser._id ? 
                             authUser.profilePic || 'profile.png' :
                             selectedUser.profilePic || 'profile.png'}
                             alt="profile pic" />
                        </div>
                    </div>
                    <div className='chat-header mb-1'>
                        <time className="text-xs opacity-50 ml-1">
                            {formatMessageTime(message.createdAt)}
                        </time>
                    </div>
                    <div className='chat-bubble flex flex-col'>
                    {message.image && (
                        <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2"
                        />
                            )}
                            {message.text && <p>{message.text}</p>}

                    </div>
                </div>
            ))}
        </div>
        <MessageInput />
    </div>
  )
}

export default ChatContainer