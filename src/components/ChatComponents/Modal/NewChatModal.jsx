import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Flex,
    Avatar,
    Box,
    Divider,
    Text,
    Spinner,
} from '@chakra-ui/react'
import CustomInput from '../../reusable/CustomInput/CustomInput';
import { MdSearch } from 'react-icons/md';

export default function NewChatModal({
    isOpen,
    onClose,
    onChange,
    userData,
    setUserData,
    loading,
    handleChatInitiate
}) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => { onClose(); setUserData([]) }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <CustomInput
                            placeholder={'Search name or number'}
                            leftIcon={<MdSearch />}
                            className={'mb-4'}
                            border={'1px solid #9AE6B4'}
                            onChange={onChange}
                        />
                        {/* List of chats */}
                        {
                            userData?.length === 0 ? (
                                <div className='flex p-10 justify-center items-center'>
                                    <Text>No User Found</Text>
                                </div>
                            ) : loading ? (
                                <div className='flex justify-center'>
                                    <Spinner />
                                </div>
                            ) : (
                                userData?.map((user, index) => (
                                    <>
                                        <Flex key={index} className="my-2 p-2 hover:bg-green-100 rounded cursor-pointer" onClick={() => handleChatInitiate(user)}>
                                            <Avatar src={user?.profilePic} />
                                            <Box className="ml-4 w-full">
                                                <div className='flex flex-col justify-between'>
                                                    <h1 className="font-bold">{user?.username}</h1>
                                                    <small>+91 {user?.phoneNumber}</small>
                                                </div>
                                            </Box>
                                        </Flex>
                                        <Divider />
                                    </>
                                ))
                            )
                        }

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
