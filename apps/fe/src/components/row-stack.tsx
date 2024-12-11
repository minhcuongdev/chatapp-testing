import { Stack, StackProps } from '@mui/material';
import { FC } from 'react';

const RowStack: FC<StackProps> = (props) => {
  return <Stack flexDirection="row" alignItems="center" {...props}></Stack>;
};

export default RowStack;
