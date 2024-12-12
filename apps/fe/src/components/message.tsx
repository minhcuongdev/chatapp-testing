import { Avatar, Box, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { FC } from 'react';
import RowStack from './row-stack';

export interface MessageProps {
  avatar: string;
  message: string;
  createdTime: string;
  owner: boolean;
}

export const Message: FC<MessageProps> = (props) => {
  return (
    <RowStack
      gap={1}
      alignItems="end"
      flexDirection={props.owner ? 'row-reverse' : 'row'}
      sx={{ color: props.owner ? 'white' : 'black' }}
    >
      <Avatar src={props.avatar} />
      <Box
        sx={{
          backgroundColor: props.owner ? blue[200] : 'white',
          borderRadius: '12px',
          padding: '12px',
        }}
      >
        <Typography>{props.message}</Typography>
        <Typography variant="subtitle2" color="textDisabled">
          {props.createdTime}
        </Typography>
      </Box>
    </RowStack>
  );
};
