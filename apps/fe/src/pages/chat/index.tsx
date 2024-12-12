import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Conversation } from '../../components';
import RowStack from '../../components/row-stack';
import SideBar from '../../components/side-bar';
import { Room } from '../../data/room.response';
import { socket } from '../../socket';
import { Message } from '../../data/message.response';

const Chat = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [prams] = useSearchParams();

  const userId = Number(sessionStorage.getItem('userId'));

  useEffect(() => {
    socket.connect();
    socket.emit('getRooms', {
      userId: userId,
    });

    socket.on('rooms', (data: Room[]) => {
      setRooms(data);
    });

    socket.on('messages', (data) => {
      setMessages(data);
    });

    return () => {
      socket.off('rooms');
      socket.off('messages');
    };
  }, []);

  useEffect(() => {
    const roomId = Number(prams.get('room'));
    socket.emit('getMessagesInRoom', { roomId });
  }, [prams]);

  const handleSendMessage = (text: string) => {
    socket.emit('sendMessage', {
      roomId: Number(prams.get('room')),
      userId: userId,
      message: text,
    });
  };

  return (
    <RowStack
      sx={{
        backgroundColor: (theme) => theme.palette.primary.alpha12,
        padding: '16px',
        height: '100vh',
      }}
    >
      <SideBar list={rooms} />
      <Conversation messages={messages} onSend={handleSendMessage} />
    </RowStack>
  );
};

export default Chat;
