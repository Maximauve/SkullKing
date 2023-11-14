import React from 'react';
import { type UserRoom } from 'types/user/UserRoom';

interface Props {
  members: UserRoom[]
}
const UsersInRoom: React.FC<Props> = ({ members }) => {
  return (
    <ul>
      {members.length > 0 && members.map((member) => (
        <li key={member.userId}>{member.username}</li>
      ))}
    </ul>
  );
};

export default UsersInRoom;
