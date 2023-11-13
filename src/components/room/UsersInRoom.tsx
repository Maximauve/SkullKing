import React, { useCallback, useEffect, useState } from 'react';
import useSocket from 'hooks/useSocket';

import { type UserRoom } from 'types/user/UserRoom';

const UsersInRoom: React.FC = () => {
  const socket = useSocket();
  const [members, setMembers] = useState<UserRoom[]>([]);

  const memberListener = useCallback((members: UserRoom[]): void => {
    setMembers(members);
  }, []);

  useEffect(() => {
    socket?.on('members', memberListener);

    return () => {
      socket?.off('members', memberListener);
    };
  }, [memberListener]);

  return (
    <ul>
      {members.map((member) => (
        <li key={member.userId}>{member.username}</li>
      ))}
    </ul>
  );
};

export default UsersInRoom;
