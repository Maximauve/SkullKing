import React, { useCallback, useEffect, useState } from 'react';
import useSocket from 'hooks/useSocket';

import { type UserRoom } from 'types/user/UserRoom';

const UsersInRoom: React.FC = () => {
  const socket = useSocket();
  const [members, setMembers] = useState<UserRoom[]>([]);

  const memberListener = useCallback((members: UserRoom[]): void => {
    console.log('members : ', members);
    setMembers(members);
  }, []);

  useEffect(() => {
    socket?.on('members', memberListener);

    return () => {
      socket?.off('members', memberListener);
    };
  }, [memberListener]);

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
