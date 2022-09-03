import React, { useEffect, useState } from 'react';
import { styled, Chip, Paper, Container, Divider } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
import { OwnedProviderItem } from '../owned-provider-item/OwnedProviderItem';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

type ChildProps = {
  ownedServices: string[];
  handleDelete: any;
};

export const OwnedProviders: React.FC<ChildProps> = ({ownedServices, handleDelete}) => {
  // const [owned, setOwned] = useState([ownedServices])
  
  useEffect(() => {
    console.log('in useEffect of OwnedProviders: ', ownedServices)
  }, [ownedServices])
  
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
       <OwnedProviderItem service={service} key={i} handleDelete={handleDelete} />
      );
    })}
  </Container>
  )
}