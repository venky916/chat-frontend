import ChatBox from '@/components/chat/ChatBox';
import MyChats from '@/components/chat/MyChats';
import SideDrawer from '@/components/miscellaneous/SideDrawer';
import { ChatState } from '@/context/ChatProvider';
import React, { useState } from 'react';

const ChatPage = () => {
  const { user } = ChatState();
   const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="w-full">
      {user && <SideDrawer />}
      <div className="flex justify-between gap-2 w-full h-[91.5vh] p-3">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;