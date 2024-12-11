import { FC } from 'react';
import { Message } from './message';
import { Stack } from '@mui/material';
import { Message as MessageDTO } from '../data/message.response';
import { TimeHelper } from '../utils/time.helper';

interface MessagesProps {
  list: MessageDTO[];
}

export const Messages: FC<MessagesProps> = (props) => {
  const userId = Number(sessionStorage.getItem('userId'));

  return (
    <Stack flex={1} gap={1}>
      {props.list.map((message) => (
        <Message
          key={message.id}
          avatar=""
          message={message.content}
          createdTime={TimeHelper.convertTo12HourFormat(message.createdAt)}
          owner={message.user.id === userId}
        />
      ))}
    </Stack>
  );
};
