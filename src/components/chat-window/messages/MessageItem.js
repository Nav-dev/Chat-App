import React, { memo } from 'react';
import TimeAgo from 'timeago-react'
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import PresenceDot from '../../PresenceDot';
import { useCurrentRoom} from '../../../context/current-room.context'; 
import { Button } from 'rsuite';
import { auth } from '../../../misc/firebase';
import { useHover } from '../../../misc/custom-hook';
import IconBtnControl from './IconBtnControl';

const MessageItem = ({message, handleAdmin }) => {
    const {author, createdAt, text }= message;

    const [selfRef , isHovered] = useHover()

    const isAdmin = useCurrentRoom(v => v.isAdmin);
    const admins = useCurrentRoom(v => v.admins);

    const isMsgAuthorAdmin = admins.includes(author.uid);
    const isAuthor = auth.currentUser.uid === author.uid;
    const canGrantAdmin = isAdmin && !isAuthor;

  return (
  <li className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' :''}`} ref={selfRef}>
    <div className='d-flex align-items-center font-bolder mb-1'>

    <PresenceDot uid={author.uid} />
        <ProfileAvatar 
        src={author?.avatar?.avatar} 
        name={author.name} 
        className="ml=1"
        size="xs" 
        />

        <ProfileInfoBtnModal 
          profile={author} 
          appearence="link"
          className="p-0 ml-1 text-black"
        >
        {canGrantAdmin && (
          <Button block onClick={() => handleAdmin(author.uid)} color="blue">
            {isMsgAuthorAdmin
              ? 'Remove admin permission'
              : 'Give admin in this room'}
          </Button> 
        )}
        </ProfileInfoBtnModal>

        <TimeAgo 
            datetime={
                createdAt
            }
            className='font-normal text-black-45 ml-2' 
            />

            <IconBtnControl
            // eslint-disable-next-line no-constant-condition
            {...(true ? {color: 'red'}: {})}
              isVisible
              iconName="heart"
              toottip="Like this message"
              onClick={() => {}}
              bageContent={5}            
            />
    </div>

    <div>
        <span className='word-breal-all'>{text}</span>
    </div>
  </li>
  )
}

export default memo(MessageItem);