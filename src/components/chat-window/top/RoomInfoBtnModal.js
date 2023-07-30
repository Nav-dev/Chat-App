import React from 'react'
import { useCurrentRoom } from '../../../context/current-room.context'
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hook';

const RoomInfoBtnModal = () => {
    const { isOpen, close, open } = useModalState()
    const description = useCurrentRoom(v=> v.description);
    const name= useCurrentRoom(v=>v.name);
  return (
    <>
        <Button appearance='link' className='px-0' onClick={open}>
            Room information
        </Button>
        <Modal show={isOpen} onHide={close}>

            <Modal.Header>
                <Modal.Title>
                    About {name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className='mb-1'>Description</h6>
                <p>{description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button block onClick={close}>
                    Close
                </Button>
            </Modal.Footer>

        </Modal>
    </>
  )
}

export default RoomInfoBtnModal