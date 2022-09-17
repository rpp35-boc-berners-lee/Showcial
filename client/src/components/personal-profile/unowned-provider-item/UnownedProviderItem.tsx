import React, {useEffect} from 'react';
import { styled, Chip, Paper, Container, Divider } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

type ChildProps = {
  service: string;
  handleAdd: any;
};

export const UnownedProviderItem : React.FC<ChildProps> = ({service, handleAdd}) => {
  
  useEffect(() => {
  }, [service])
  
  return (
    <ListItem >
      <Chip
        label={service}
        onDelete={handleAdd(service)}
        deleteIcon={<AddCircleOutlineOutlinedIcon />}
      />
  </ListItem>
  )
}