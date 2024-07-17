import React, { useContext, useEffect, useState } from 'react';
import { Box, Flex, Input, Button, Textarea, Avatar, Text, Spinner } from '@chakra-ui/react';
import CustomInput from '../reusable/CustomInput/CustomInput';
import { CommonContextProvider } from '../../context/CommonContext';
import { getSender } from '../../utils/helper';
import { getUserChats } from '../../services/ChatServices';
import { getAllMessages, sendMessage } from '../../services/MessageServices';
import MessageWindow from './Message/MessageWindow';
import Emoji from './Message/Emoji';
import { HiOutlineFaceSmile } from 'react-icons/hi2';
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";


const ENDPOINT = 'https://ping-kar.onrender.com';
var socket, selectedChatCompare

export default function ChatWindow() {

    const { selectedChat, user, setSelectedChat, setUser, toast } = useContext(CommonContextProvider);

    //States
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageLoading, setMessageLoading] = useState(false);
    const [isEmoji, setIsEmoji] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const handleGetUserChats = async () => {
        try {
            const response = await getUserChats();
            if (response) {
                setSelectedChat(response?.data?.userChats[0]);
            }
        }
        catch (err) {
            toast({
                title: err?.response?.data?.message || err?.message,
                description: err?.response?.data?.data?.error || err?.message,
                status: 'error',
                position: 'top-right'
            });
        }
    }

    const getMessageOfChat = async () => {
        setMessageLoading(true)
        try {
            const response = await getAllMessages(selectedChat._id);
            if (response) {
                setMessageLoading(false)
                setMessages(response?.data?.messages);
                socket.emit('join chat', selectedChat._id)
            }
        }
        catch (err) {
            setMessageLoading(false)
            toast({
                title: err?.response?.data?.message || err?.message,
                description: err?.response?.data?.data?.error || err?.message,
                status: 'error',
                position: 'top-right'
            });
        }
    }

    const handleSendMessage = async (message, chatId) => {
        socket.emit("stop typing", selectedChat._id)
        try {
            const response = await sendMessage({ message, chatId });
            if (response) {
                setMessage("");
                setMessages([...messages, response?.data?.message]);
                socket.emit("send message", response?.data?.message)
            }
        }
        catch (err) {
            toast({
                title: err?.response?.data?.message || err?.message,
                description: err?.response?.data?.data?.error || err?.message,
                status: 'error',
                position: 'top-right'
            });
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", JSON.parse(sessionStorage.getItem('userInfo')));
        socket.on("connection", (message) => {
            setSocketConnected(true);
        });
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, [])

    useEffect(() => {
        if (selectedChat._id) {
            getMessageOfChat();
            selectedChatCompare = selectedChat;
        }
    }, [selectedChat]);

    useEffect(() => {
        socket.on("new message received", (newMessageReceived) => {

            console.log("New message received:", newMessageReceived);
            console.log(selectedChatCompare)
            if (selectedChatCompare && selectedChatCompare._id === newMessageReceived.chat._id) {
                console.log("inside", newMessageReceived)
                setMessages([...messages, newMessageReceived]);
            }
        })
    })

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('userInfo'));
        setUser(user);
        handleGetUserChats();
    }, [setUser]);

    if (!user || Object.keys(selectedChat).length === 0) {
        return (
            <div className='w-full flex justify-center mt-5'>
                <Spinner />
            </div>
        );
    }

    const handleInputOnChange = (e) => {
        setMessage(e.target.value);

        //Typing
        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id)
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var now = new Date().getTime();
            let timeDiff = now - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id)
                setTyping(false);
            }

        }, timerLength)
    }

    return (
        <div className="w-3/4 flex flex-col">
            {
                selectedChat ? (
                    <>
                        <Flex className="p-4 bg-green-100 border-b border-green-200">
                            <div className='flex items-center gap-3'>
                                <Avatar />
                                <div>
                                    <div className="font-bold">{getSender(selectedChat.users, user._id).username}</div>
                                    <div className="text-sm text-gray-500">
                                        {
                                            ((isTyping) && (getSender(selectedChat?.users, user._id)._id !== user._id)) ? <span className='font-bold'>Typing...</span> : "Last seen today at 10:23 PM"
                                        }
                                    </div>
                                </div>
                            </div>
                        </Flex>
                        <Box
                            className="messages flex-grow"
                            d="flex"
                            flexDir="column"
                            justifyContent="flex-end"
                            p={3}
                            bg="#E8E8E8"
                            w="100%"
                            h="100%"
                            borderRadius="lg"
                            overflowY="hidden"
                        >
                            <MessageWindow
                                messages={messages}
                                messageLoading={messageLoading}
                                user={user}
                            />
                        </Box>

                        <Flex className="p-3 border-t relative  border-green-200" justifyContent={'center'} alignItems={'center'} gap={'2'}>
                            <HiOutlineFaceSmile
                                className="w-8 h-8 cursor-pointer"
                                onClick={() => setIsEmoji(!isEmoji)}
                            />

                            {
                                isEmoji && (
                                    <div className="flex items-center gap-2 absolute bottom-16 z-10 left-4">
                                        <Emoji
                                            setMessage={setMessage}
                                            setIsEmoji={setIsEmoji}
                                        />
                                    </div>
                                )
                            }

                            <CustomInput className="flex-grow" placeholder="Type a message" value={message} onChange={handleInputOnChange} />
                            <IoSend colorScheme="green" className={`w-8 h-8 ml-2 text-green-600 cursor-pointer ${!message && "pointer-events-none text-gray-400"}`} onClick={() => handleSendMessage(message, selectedChat._id)} />
                        </Flex>
                    </>
                ) : (
                    <Text>No chat selected</Text>
                )
            }
        </div>
    );
};