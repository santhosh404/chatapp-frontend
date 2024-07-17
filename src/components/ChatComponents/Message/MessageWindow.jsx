import { Box, Spinner } from '@chakra-ui/react';
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import { getTime } from '../../../utils/helper';

export default function MessageWindow({ messages, messageLoading, user}) {
    return (
        <>
            <ScrollableFeed>
                {
                    messageLoading ? (
                        <div className='flex justify-center items-center'>
                            <Spinner />
                        </div>
                    ) : (
                        messages.length === 0 ? (
                            <div className='flex justify-center items-center'>
                                No Conversations Yet
                            </div>
                        ) : (
                            messages.map((item, i) => (
                                <Box
                                    key={i}
                                    display="flex"
                                    justifyContent={item.sender._id === user._id ? 'flex-end' : 'flex-start'}
                                    my={2}
                                >
                                    <Box
                                        p={3}
                                        borderRadius="lg"
                                        bg={item.sender._id === user._id ? '#C6F6D5' : '#EDF2F7'}
                                        maxWidth="75%"
                                        color="black"
                                        alignSelf={item.sender._id === user._id ? 'flex-end' : 'flex-start'}
                                    >
                                        <div className='flex gap-3'>
                                            {item.content}
                                            <small className=' self-end'>{getTime(item.createdAt)}</small>
                                        </div>

                                    </Box>
                                </Box>
                            ))
                        )
                    )
                }
            </ScrollableFeed>
        </>
    )
}
