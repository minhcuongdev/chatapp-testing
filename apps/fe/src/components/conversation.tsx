import {
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import { Messages } from './messages';
import { FC, useEffect, useState } from 'react';
import { socket } from '../socket';
import SendIcon from '@mui/icons-material/Send';
import { Message } from '../data/message.response';

interface ConversationProps {
  roomId: number;
}

export const Conversation: FC<ConversationProps> = (props) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const userId = Number(sessionStorage.getItem('userId'));

  useEffect(() => {
    socket.on('messages', (data) => {
      setMessages(data);
    });

    return () => {
      socket.off('messages');
    };
  }, []);

  useEffect(() => {
    socket.emit('getMessagesInRoom', { roomId: props.roomId });
  }, [props.roomId]);

  const handleSendMessage = () => {
    socket.emit('sendMessage', {
      roomId: props.roomId,
      userId: userId,
      message: text,
    });
    setText('');
  };

  return (
    <Stack flex={1} height="100%" paddingLeft={2}>
      <Messages list={messages} />
      <Paper sx={{ borderRadius: '16px' }}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          variant="outlined"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleSendMessage}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Paper>
    </Stack>
  );
};
