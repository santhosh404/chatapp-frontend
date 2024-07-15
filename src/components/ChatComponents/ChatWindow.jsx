import React, { useContext, useEffect } from 'react';
import { Box, Flex, Input, Button, Textarea, Avatar, Text, Spinner } from '@chakra-ui/react';
import CustomInput from '../reusable/CustomInput/CustomInput';
import { CommonContextProvider } from '../../context/CommonContext';
import { getSender } from '../../utils/helper';
import { getUserChats } from '../../services/ChatServices';

export default function ChatWindow(){

    const { selectedChat, user, setSelectedChat, setUser, toast } = useContext(CommonContextProvider)

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

    return (
        <div className="w-3/4 flex flex-col">
            {
                selectedChat ? (
                    <>
                        <Flex className="mb-4 p-4 bg-green-100 border-b border-green-200">
                            <div className='flex items-center gap-3'>
                                <Avatar />
                                <div>
                                    <div className="font-bold">{getSender(selectedChat.users, user._id).username}</div>
                                    <div className="text-sm text-gray-500">Last seen today at 10:24 PM</div>
                                </div>
                            </div>
                        </Flex>
                        <Box className="flex-grow p-4 bg-white overflow-y-scroll">
                            {/* Add chat messages here */}
                        </Box>
                        <Flex className="p-3 border-t border-green-200">
                            <CustomInput className="flex-grow" placeholder="Type a message" />
                            <Button colorScheme="green" className="ml-2">Send</Button>
                        </Flex>
                    </>

                ) : (
                    <Text>No chat selected</Text>
                )
            }

        </div>
    );
};

