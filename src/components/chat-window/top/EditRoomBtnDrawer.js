import React, { memo } from 'react'
import { Alert, Button, Drawer } from 'rsuite'
import { useMediaQuery, useModalState } from '../../../misc/custom-hook'

import { useCurrentRoom } from '../../../context/current-room.context';
import { database } from '../../../misc/firebase';
import { useParams } from 'react-router';
import EditableInput from '../../EditableInput';

const EditRoomBtnDrawer = () => {
    const {isOpen, open, close} = useModalState();
    const { chatId} = useParams();
    const isMobile = useMediaQuery('(max-width:992px)')

    const name = useCurrentRoom(v => v.name);
    const description = useCurrentRoom(v => v.description);

    const updateData = (key, value) => {
        database.ref(`rooms/${chatId}`).child(key).set(value).then(()=>{
            Alert.success('Successfully updated', 4000);
        }).catch(err => {
            Alert.message(err.message,4000);
        })
    }

    const onNameSave = (newName) => {
        updateData('name', newName)
    }

    const onDescriptionSave = (newDesc) => {
        updateData('description', newDesc)
    }
  return (
    <div>
        <Button className='br-circle' size='sm' color="red" onClick={open}>
            A
        </Button>

        <Drawer full={isMobile} show={isOpen} onHide={close} placement='right'>

            <Drawer.Header>
                <Drawer.Title>Edit Room</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <EditableInput
                    initialValue={name}
                    onSave={onNameSave}
                    label={<h6 className='mb-2'>Name</h6>}
                    emptyMsg="Name can not be empty"
                />
                <EditableInput 
                    componentClass="textarea"
                    row={5}
                    initialValue={description}
                    onSave={onDescriptionSave}
                    emptyMsg="Description can not be empty"
                    wrapperClassName='mt-3'
                />
            </Drawer.Body>
            <Drawer.Footer>
                <Button block onClick={close}>
                    Close
                </Button>
            </Drawer.Footer>
        </Drawer>
        </div>
  )
}

export default memo (EditRoomBtnDrawer);