import {
  Card,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import RowStack from './row-stack';
import { RoomList, RoomListProps } from './room-list';

type SideBarProps = RoomListProps;

const SideBar: FC<SideBarProps> = (props) => {
  return (
    <Paper
      sx={{
        height: '100%',
      }}
    >
      <Stack
        sx={{
          width: '350px',
        }}
        py={3}
        gap={1}
      >
        <Stack gap={2} px={2}>
          <Card>
            <IconButton></IconButton>
          </Card>
          <RowStack>
            <Typography variant="h5">Chat</Typography>
          </RowStack>
          <TextField fullWidth label="Search name" />
        </Stack>
        <RoomList list={props.list} />
      </Stack>
    </Paper>
  );
};

export default SideBar;
