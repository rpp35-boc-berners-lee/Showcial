import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { UnownedProviderItem } from '../unowned-provider-item/UnownedProviderItem';


type ChildProps = {
  unownedServices: string[];
  handleAdd: any;
};

export const UnownedProviders: React.FC<ChildProps> = ({unownedServices, handleAdd}) => {
  
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
      pt: 2,
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