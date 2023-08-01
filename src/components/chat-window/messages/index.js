import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const Messages = () => {
  const {chatId} = useParams()
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;
  useEffect(() =>{
    const messageRef = database.ref('/messages');

    messageRef.orderByChild('roomId').equalTo(chatId).on('value', (snap)=>{
      const data = transformToArrWithId(snap.val());
      setMessages(data);

    })

    return () =>{
      messageRef.off('value');
    }
  },[chatId])

  return <ul className='msg-list custom scroll'>
    {isChatEmpty && <li>No messages yet</li>}
    {canShowMessages && 
    messages.map
    (msg => <MessageItem key={msg.id} message={msg} />)}

  </ul>
}

export default Messages