import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ChatLayout from '../../layouts/ChatLayout';

export default function Chat() {

  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(userInfo);
    if (!userInfo) {
      navigate('/signin')
    }

  }, [navigate])


  return (
    <div className='w-full'>
      <ChatLayout />
    </div>
  )
}
