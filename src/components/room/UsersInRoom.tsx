import React from 'react';
import { type UserRoom } from 'types/user/UserRoom';

interface Props {
  members: UserRoom[]
}
const UsersInRoom: React.FC<Props> = ({ members }) => {
  return (
    <div className='user-list'>
      <div className='user-counter'>
        <div className='counter'>{members.length}</div>
      </div>
      <ul>
        {members.length > 0 && members.map((member) => (
          <li key={member.userId}>{member.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersInRoom;
