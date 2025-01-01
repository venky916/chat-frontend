import { ChatState } from '@/context/ChatProvider';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { IoAddOutline } from 'react-icons/io5';
import ChatLoading from '../miscellaneous/ChatLoading';
import { getSender } from '@/utils/helper';
import GroupChatModal from './GroupChatModal';

const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const { toast } = useToast();
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.BASE_URL}/api/chat`,
        config,
      );
      // console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  return (
    <>
      <div
        className={`${selectedChat ? 'hidden' : 'flex'} md:flex flex-col p-3  bg-white w-full  md:w-1/3 rounded-lg border-1 `}
      >
        <div className="pb-3 px-3 text-[25px] md:text-[28px]  font-workSans flex w-full justify-between items-center">
          My Chats
          <Button onClick={() => setIsGroupModalOpen(true)}>
            New Group Chat <IoAddOutline />
          </Button>
        </div>
        <div className="flex flex-col p-3 bg-[#F8F8F8] w-full h-full rounded-lg overflow-y-hidden">
          {chats ? (
            <div className="overflow-y-scroll ">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  className={`cursor-pointer my-2 px-3 py-2 rounded-lg ${selectedChat === chat ? 'bg-[#38B2AC] text-white' : 'bg-[#E8E8E8] text-black'}`}
                >
                  <h1>
                    {!chat.isGroupChat
                      ? getSender(user, chat.users)
                      : chat.chatName}
                  </h1>
                </div>
              ))}
            </div>
          ) : (
            <ChatLoading />
          )}
        </div>
      </div>
      <GroupChatModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
      />
    </>
  );
};

export default MyChats;
