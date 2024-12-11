import React, { FC } from 'react';
import { Room, RoomProps } from './room';
import { MenuList } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

export interface RoomListProps {
  list: Array<Omit<RoomProps, 'onClick'>>;
}

export const RoomList: FC<RoomListProps> = (props) => {
  const [_, set] = useSearchParams();

  const handleRoomClick = (roomId: number) => {
    set({ room: roomId.toString() });
  };

  return (
    <MenuList>
      {props.list.map((room) => (
        <Room
          key={room.id}
          {...room}
          onClick={() => handleRoomClick(room.id)}
        />
      ))}
    </MenuList>
  );
};
