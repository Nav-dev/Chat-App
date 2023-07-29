import React from 'react'
import { Loader, Nav } from 'rsuite'
import RoomItem from './RoomItem';
import { useRooms } from '../../context/rooms.context';
import { Link, useLocation } from 'react-router-dom';

const ChatRoomList = ({ aboveElHeight }) => {

  const rooms = useRooms(); 
  const location = useLocation(); 
  return (
   <Nav
    appearence="subtle"
    vertical
    reversed
    className='overflow-y-scroll custom-scroll'
    style={{
      height: `calc(100% - ${aboveElHeight}px)`,
   }}
   activeKey={location.pathname}
   >
    {!rooms && (
      <Loader center vertical content="Loading" speed="slow" size="md" />
    )}
    {rooms && 
    rooms.length > 0 &&
    rooms.map(room =>(
      <Nav.Item 
      componentClass={ Link } 
      to={`/chat/${room.id}`} 
      key= {room.id}
      eventKey={`/chat/${room.id}`}
      >
        <RoomItem room={room} />
      </Nav.Item>
  ))} 
  </Nav>
  );
};

export default ChatRoomList