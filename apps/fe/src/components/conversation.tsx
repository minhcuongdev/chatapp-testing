import SendIcon from '@mui/icons-material/Send';
import {
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import { FC, useState } from 'react';
import { Message } from '../data/message.response';
import { Messages } from './messages';

interface ConversationProps {
  messages: Message[];
  onSend: (text: string) => void;
}

export const Conversation: FC<ConversationProps> = (props) => {
  const [text, setText] = useState('');

  const handleSendMessage = () => {
    props.onSend(text);
    setText('');
  };

  return (
    <Stack flex={1} height="100%" paddingLeft={2}>
      <Messages list={props.messages} />
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
