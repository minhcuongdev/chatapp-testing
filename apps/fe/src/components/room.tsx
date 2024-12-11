import { Avatar, MenuItem, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import RowStack from './row-stack';
import { StyledBadge } from './styled-badge';

export interface RoomProps {
  id: number;
  name: string;
  avatar?: string;
  lastMessage?: string;
  online?: boolean;
  onClick: () => void;
}

export const Room: FC<RoomProps> = (props) => {
  return (
    <MenuItem onClick={props.onClick}>
      <RowStack gap={2}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar src={props.avatar} />
        </StyledBadge>
        <Stack>
          <Typography variant="h6">{props.name}</Typography>
          <Typography variant="subtitle1" color="textDisabled">
            {props.lastMessage}
          </Typography>
        </Stack>
      </RowStack>
    </MenuItem>
  );
};
