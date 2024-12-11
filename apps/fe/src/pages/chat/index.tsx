import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Conversation } from '../../components';
import RowStack from '../../components/row-stack';
import SideBar from '../../components/side-bar';
import { Room } from '../../data/room.response';
import { socket } from '../../socket';

const Chat = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [prams] = useSearchParams();
  const [roomSelected, setRoomSelected] = useState<number>(-1);

  useEffect(() => {
    socket.connect();
    const userId = Number(sessionStorage.getItem('userId'));
    socket.emit('getRooms', {
      userId: userId,
    });

    socket.on('rooms', (data: Room[]) => {
      setRooms(data);
    });

    return () => {
      socket.off('rooms');
    };
  }, []);

  useEffect(() => {
    setRoomSelected(Number(prams.get('room')));
  }, [prams]);

  return (
    <RowStack
      sx={{
        backgroundColor: (theme) => theme.palette.primary.alpha12,
        padding: '16px',
        height: '100vh',
      }}
    >
      <SideBar list={rooms} />
      <Conversation roomId={roomSelected} />
    </RowStack>
  );
};

export default Chat;
