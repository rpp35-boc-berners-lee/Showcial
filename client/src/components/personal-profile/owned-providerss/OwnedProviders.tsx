import React from 'react';
import { styled, Chip, Paper, Container, Divider } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

type ChildProps = {
  ownedServices: string[];
  handleDelete: any;
};

export const OwnedProviders: React.FC<ChildProps> = ({ownedServices, handleDelete}) => {

  

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
    {ownedServices.map((service, i) => {
      console.log('ownedServices in child component', ownedServices)
      return (
        <ListItem key={i}>
          <Chip
            label={service}
            onDelete={handleDelete(service)}
            deleteIcon={<RemoveCircleOutlineIcon />}
          />
        </ListItem>
      );
    })}
  </Container>
  )
}