import React from 'react';
import { Button, Icon, Drawer} from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hook';
import Dashboard from '.';
const DashboardToggle = () => {

    const { isOpen, close, open } = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)');
  return (
    <>
        <Button block color="blue" onClick={open}>
            <Icon icon="dashboard" />Dashboard
        </Button>
        <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
            <Dashboard />
        </Drawer>
        <Dashboard />
    </>
  )
}

export default DashboardToggle