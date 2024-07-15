import React from 'react';
import ChatSidebar from '../components/ChatComponents/ChatSidebar';
import ChatWindow from '../components/ChatComponents/ChatWindow';

const ChatLayout = () => {
    return (
        <div className="flex h-screen">
            <ChatSidebar />
            <ChatWindow />
        </div>
    );
};

export default ChatLayout;