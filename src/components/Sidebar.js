import React from 'react';
import DashboardToggle from './dashboard/DashboardToggle';
import CreateRoomBtnModal from './dashboard/CreateRoomBtnModal';

const Sidebar = () => {
  return (
    <div className='h-200 pt-2'>
        <div>
            <DashboardToggle />
            <CreateRoomBtnModal />
        </div>
        bottom
    </div>
  )
}

export default Sidebar