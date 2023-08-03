import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { auth, database } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';
import { Alert } from 'rsuite';

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
  },[chatId]);

  const handleAdmin = useCallback(async (uid) =>{
    const adminsRef = database.ref(`/rooms/${chatId}/admins`);

    let alertMsg;

    await adminsRef.transaction(admins => {
      if (admins) {
        if (admins[uid]) {
          admins[uid] = null;
          alertMsg = 'Sorry, admin permission removed'
        } else {
          admins[uid] = true;
          alertMsg = 'Hurrah!! admin permission granted';
        }
      }
      return admins;
    });

    Alert.info(alertMsg, 4000);
   
  },
   [chatId]
   );
   const handleLike = useCallback(async msgId =>{
    const { uid } = auth.currentUser; 
    const messageRef = database.ref(`/messages/${msgId}`);

    let alertMsg;

    await messageRef.transaction(msg => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alertMsg = 'Like removed'
        } else {
          msg.likeCount +=1;

          if(!msg.likes){
            msg.likes = {};
          }

          msg.likes[uid] = true;
          alertMsg = 'Likes added';
        }
      }
      return msg;
    },);

    Alert.info(alertMsg, 4000)

   }, [])

  return <ul className='msg-list custom scroll'>
    {isChatEmpty && <li>No messages yet</li>}
    {canShowMessages && 
    messages.map
    (msg => <MessageItem key={msg.id} message={msg} handleAdmin={handleAdmin} handleLike={handleLike} />)}

  </ul>
}

export default Messages