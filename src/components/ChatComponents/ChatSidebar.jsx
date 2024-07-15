import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Divider, Flex, Input, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { HiPencilSquare } from "react-icons/hi2";
import { MdFilterList, MdPerson, MdPerson2, MdPerson3, MdSearch } from "react-icons/md";
import CustomInput from '../reusable/CustomInput/CustomInput';
import NewChatModal from './Modal/NewChatModal';
import { getUserChats, getUsers, handleInitiateChat } from '../../services/ChatServices';
import { CommonContextProvider } from '../../context/CommonContext';
import { getSender } from '../../utils/helper';



const ChatSidebar = () => {
    const contacts = [
        { name: 'John Doe', message: 'Hey, how are you?' },
        { name: 'Jane Smith', message: 'Let\'s catch up later!' },
        { name: 'Kane Doe', message: 'Let\'s catch up later!' },
        // Add more contacts as needed
    ];

    //states
    const [userData, setUserData] = useState([])
    const [userChats, setUserChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { toast, user, selectedChat, setSelectedChat } = useContext(CommonContextProvider)

    const handleUserSearchOnChange = async (e) => {
        setLoading(true);
        try {
            const user = await getUsers(e.target.value);
            if (user) {
                setUserData(user?.data?.user);
                setLoading(false);
            }
        }
        catch (err) {
            setLoading(false);
            toast({
                title: err?.response?.data?.message || err?.message,
                description: err?.response?.data?.data?.error || err?.message,
                status: 'error',
                position: 'top-right'
            });
        }
    }


    const handleChatInitiate = async (user) => {
        try {
            const response = await handleInitiateChat({ userId: user._id });
            if (response) {
                toast({
                    title: 'Chat initiated successfully',
                    status: 'success',
                    position: 'top-right'
                });
                setSelectedChat(response?.data?.chat);
                setUserData([]);
                handleGetUserChats();
                onClose();
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

    const handleGetUserChats = async () => {
        setChatLoading(true);
        try {
            const response = await getUserChats();
            if (response) {
                setUserChats(response?.data?.userChats);
                setChatLoading(false);
            }
        }
        catch (err) {
            setChatLoading(false);
            toast({
                title: err?.response?.data?.message || err?.message,
                description: err?.response?.data?.data?.error || err?.message,
                status: 'error',
                position: 'top-right'
            });
        }
    }

    useEffect(() => {
        handleGetUserChats();
    }, [])

    return (
        <>

            <div className="w-1/4 bg-green-50 p-4 border-r border-green-200">
                <div className='flex justify-between items-center mb-6'>
                    <Text className="text-xl font-bold">Chats</Text>
                    <div className='flex items-center gap-1'>
                        <div className=' p-2 hover: hover:bg-green-200 rounded-md hover:text-[#000] transition-all ease-in'>
                            <HiPencilSquare className='w-5 h-5 cursor-pointer' onClick={onOpen} />
                        </div>
                        <div className=' p-2 hover: hover:bg-green-200 rounded-md hover:text-[#000] transition-all ease-in'>
                            <MdFilterList className='w-5 h-5 cursor-pointer ' />
                        </div>
                        <div className=' p-2 hover: hover:bg-green-200 rounded-md hover:text-[#000] transition-all ease-in'>
                            <MdPerson3 className='w-5 h-5 cursor-pointer ' />
                        </div>
                    </div>
                </div>
                <div>
                    <CustomInput
                        placeholder={'Search for a chat'}
                        leftIcon={<MdSearch />}
                        className={'mb-4'}
                        border={'1px solid #9AE6B4'}
                    />
                </div>
                {
                    userChats?.length === 0 ? (
                        <Text className="text-md text-gray-500 text-center mt-5">No chats found</Text>
                    ) : (
                        chatLoading ? <Spinner /> : (
                            userChats?.map((userChat, index) => (
                                <>
                                    <Flex key={index} className={`${selectedChat?._id === userChat._id && 'bg-green-200 hover:bg-green-200'} my-2 p-2 hover:bg-green-100 rounded cursor-pointer`} onClick={() => setSelectedChat(userChat)}>
                                        <Avatar src={getSender(userChat.users, user._id).profilePic} />
                                        <Box className="ml-4 w-full">
                                            <div className='flex justify-between items-center'>
                                                <h1 className="font-bold">{getSender(userChat.users, user._id).username}</h1>
                                                <small>07:24 PM</small>
                                            </div>
                                            <Text className="text-sm text-gray-500">Hey there! I'm using Whatsapp</Text>
                                        </Box>
                                    </Flex>
                                    <Divider />
                                </>
                            ))
                        )
                    )

                }
            </div>
            <NewChatModal
                isOpen={isOpen}
                onClose={onClose}
                onChange={handleUserSearchOnChange}
                handleChatInitiate={handleChatInitiate}
                userData={userData}
                setUserData={setUserData}
                loading={loading}
            />
        </>

    );
};

export default ChatSidebar;
