import React, {useEffect} from 'react';
import { styled, Chip, Paper, Container, Divider } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import theme from '../../../theme/theme';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

type ChildProps = {
  service: string;
  handleDelete: any;
};

export const OwnedProviderItem : React.FC<ChildProps> = ({service, handleDelete}) => {
  
  useEffect(() => {
  }, [service])
  return (
    <ListItem >
      <Chip
        color='primary'
        label={service}
        onDelete={handleDelete(service)}
        deleteIcon={<RemoveCircleOutlineIcon />}
      />
  </ListItem>
  )
}