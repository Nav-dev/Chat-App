import React from 'react';
import DashboardToggle from './dashboard/DashboardToggle';

const Sidebar = () => {
  return (
    <div className='h-200 pt-2'>
        <div>
            <DashboardToggle />
        </div>
    </div>
  )
}

export default Sidebar