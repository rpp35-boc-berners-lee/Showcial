import React, { useEffect, useState } from 'react';
import { styled, Chip, Paper, Container, Divider } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import axios from 'axios';
import { UnownedProviderItem } from '../unowned-provider-item/UnownedProviderItem';


type ChildProps = {
  unownedServices: string[];
  handleAdd: any;
};

export const UnownedProviders: React.FC<ChildProps> = ({unownedServices, handleAdd}) => {
  // const [unowned, setUnowned] = useState(unownedServices);
  
  useEffect(() => {
    console.log('in useEffect of UnownedProviders: ', unownedServices);
  }, [unownedServices])
  
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
        <UnownedProviderItem service={service} key={i} handleAdd={handleAdd} />
      );
    })}
  </Container>
  )
}