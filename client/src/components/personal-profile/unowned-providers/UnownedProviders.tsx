import React from 'react';
import { styled, Chip, Paper, Container, Divider } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import axios from 'axios';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

type ChildProps = {
  unownedServices: string[];
  handleAdd: any;
};

export const UnownedProviders: React.FC<ChildProps> = ({unownedServices, handleAdd}) => {
  
  
  return (
  <Container
    sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      p: 0.5,
      m: 0,
    }}
    component="ul"
  >
    {unownedServices.map((service, i) => {
      return (
        <ListItem key={i}>
          <Chip
            label={service}
            onDelete={handleAdd(service)}
            deleteIcon={<AddCircleOutlineOutlinedIcon />}
          />
        </ListItem>
      );
    })}
  </Container>
  )
}