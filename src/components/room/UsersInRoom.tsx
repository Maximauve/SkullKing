import React from 'react';
import { type UserRoom } from 'types/user/UserRoom';

interface Props {
  members: UserRoom[]
  number: number
  winner?: UserRoom
}
const UsersInRoom: React.FC<Props> = ({ members, number, winner }) => {
  return (
    <div className='user-list'>
      <div className='user-counter'>
        <div className='counter'>{number}</div>
      </div>
      <ul>
        {members.length > 0 && members.map((member) => (
          <li className={'' + (member.hasToPlay ? 'active' : '') + (member.userId === winner?.userId ? ' winner' : '')} key={member.userId}>{member.username} - {member.points}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersInRoom;
