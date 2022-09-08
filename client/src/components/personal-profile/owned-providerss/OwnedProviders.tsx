import React, { useEffect, useState } from 'react';
import { styled, Chip, Paper, Container, Divider } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
import { OwnedProviderItem } from '../owned-provider-item/OwnedProviderItem';

type ChildProps = {
  ownedServices: string[];
  handleDelete: any;
};

export const OwnedProviders: React.FC<ChildProps> = ({ownedServices, handleDelete}) => {
  // const [owned, setOwned] = useState([ownedServices])
  
  useEffect(() => {
    console.log('in useEffect of OwnedProviders: ', ownedServices)
  }, [ownedServices])
  
  console.log('OwnedProviders rendered');
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        pb: 2,
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