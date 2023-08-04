import React, { useCallback, useState } from 'react'
import { Icon, InputGroup, Input, Alert} from 'rsuite';
import firebase from 'firebase/app';
import { useProfile } from '../../../context/profile.context';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { database } from '../../../misc/firebase';
import AttachmentBtnModal from './AttachmentBtnModal';
import AudioMsgBtn from './AudioMsgBtn';

function assembleMessage(profile, chatId){
    return{
        roomId: chatId,
        author:{
            name: profile.name,
            uid: profile.uid,
            createdAt: profile.createdAt,
            avatar:(profile.avatar ? {avatar:profile.avatar } : {})
        },
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        likeCount: 0,
    };
}

const Bottom = () => {

    const [input, setInput ] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { chatId } = useParams();
    const { profile } = useProfile();

    const onInputChange = useCallback((value)=>{
        setInput(value);
    },[])

    const onSendClick = async () => {
        
        if(input.trim() === ''){
            return;
        }

        const msgData = assembleMessage(profile, chatId);
        msgData.text = input;

        const updates = {};

        const messageId = database.ref('messages').push().key;

        updates[`/messages/${messageId}`] = msgData;
        updates[`/rooms/${chatId}/lastMessage`] = {
            ...msgData,
            msgId: messageId,
        };
        setIsLoading(true);
        try{
            await database.ref().update(updates);
            setInput('');
            setIsLoading(false);

        }catch(err){
            setIsLoading(false);
            Alert.error(err.message)            
        }
    };

    const onKeyDown = (ev) => {
        if(ev.keyCode === 13){
            ev.preventDefault();
            onSendClick();
        }
    };

    const afterUpload = useCallback(async(files) => {
        setIsLoading(true);
        const updates = {};

        files.forEach(file => {

            const msgData = assembleMessage(profile, chatId);
            msgData.file = file;

            const messageId = database.ref('messages').push().key;

            updates[`/messages/${messageId}`] = msgData;
        })

        const lastMsgId = Object.keys(updates).pop();

        updates[`/rooms/${chatId}/lastMessage`] = {
            ...updates[lastMsgId],
            msgId: lastMsgId,
        };

        try{
            await database.ref().update(updates);
            setIsLoading(false);

        }catch(err){
            setIsLoading(false);
            Alert.error(err.message)            
        }
    }, [chatId, profile])

  return (
  <div>
    <InputGroup>
    <AttachmentBtnModal afterUpload={afterUpload}/>
    <AudioMsgBtn afterUpload={afterUpload} />
    <Input 
    placeholder="Write a new appearence here..." 
    value={input} 
    onChange={onInputChange}
    onKeyDown={onKeyDown} 
    />

    <InputGroup.Button 
     color="yellow"
     appearance='primary' 
     onClick={onSendClick}
     disabled={isLoading}
     >
        <Icon icon="send" />
    </InputGroup.Button>
    </InputGroup>
  </div>
  );
}

export default Bottom;