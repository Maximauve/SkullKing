import React from 'react';
import { type UserRoom } from 'types/user/UserRoom';

interface Props {
  members: UserRoom[]
  number: number
}
const UsersInRoom: React.FC<Props> = ({ members, number }) => {
  return (
    <div className='user-list'>
      <div className='user-counter'>
        <div className='counter'>{number}</div>
      </div>
      <ul>
        {members.length > 0 && members.map((member) => (
          <li key={member.userId}>{member.username} - {member.points}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersInRoom;
