import React, { useState } from 'react';
import { auth } from '../../misc/firebase';
import firebase from 'firebase';
import { Button, Icon, Tag, Alert } from 'rsuite';

const ProviderBlock = () => {
    const [isConnected, setIsConnected] = useState({
        'google.com' : auth.currentUser.providerData.some(
            data=> data.providerId === 'google.com'
        ),
    });

    const updateIsConnected = (providerId, value) =>{
        setIsConnected(p => {
            return{
                ...p,
                [providerId] : value,
            };
        });
    };

    const unlink = async providerId =>{
        try{
            if(auth.currentUser.providerData.length ===1){
                throw new Error(`You can not disconnect from ${providerId}`)
            }

        await auth.currentUser.unlink(providerId);
        updateIsConnected(providerId, false);
        Alert.info(`Disconnected from ${providerId}`, 4000);

    }catch(err){
        Alert.error(err.message,4000);
    }
}

    const unlinkGoogle = () => {
        unlink('google.com');
    }

    const link = async (provider) => {
        try {
            await auth.currentUser.linkWithPopup(provider);
            Alert.info(`Linked to ${provider.providerId}`, 4000)

            updateIsConnected(provider.providerId, true);

        } catch(err){
            Alert.error(err.message, 4000)
        }

    }
    const linkGoogle = () =>{
        link(new firebase.auth.GoogleAuthProvider())
    }
  return (
  <div>
    {isConnected["google.com"] && 
    <Tag color = "green" closable onClose={unlinkGoogle}>
        <Icon icon="google" /> Connected
    </Tag>
}
    <div className='mt-2'>
        {!isConnected['google.com'] &&
        <Button block color="blue" onClick={linkGoogle}>
            <Icon icon="google" /> Link to Google
        </Button>
}
    </div>
    </div>
  );
}

export default ProviderBlock;