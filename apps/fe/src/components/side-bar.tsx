import {
  Card,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { RoomList, RoomListProps } from './room-list';
import RowStack from './row-stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
        <Stack gap={3} px={2}>
          <Card
            sx={{
              padding: '12px',
              cursor: 'pointer',
            }}
          >
            <RowStack>
              <IconButton>
                <AddCircleOutlineIcon color="primary" />
              </IconButton>
              <Typography variant="h6">Create New</Typography>
            </RowStack>
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
