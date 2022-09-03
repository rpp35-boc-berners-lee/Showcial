import React, { useEffect } from 'react';
import './WatchProviders.scss';
import { OwnedProviders } from '../owned-providerss/OwnedProviders';
import { UnownedProviders } from '../unowned-providers/UnownedProviders';
import { styled, Chip, Paper, Container, Divider } from '@mui/material';
// import Chip from '@mui/material/Chip';
// import Paper from '@mui/material/Paper';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';

let owned: string[] = [];
let unowned: string[] = [];

export const WatchProviders = ({userName}: {userName: string}) => {

  const allServices: string[] = ['Netflix', 'Hulu', 'Disney+', 'Prime Video', 'HBO Max'];
  
  const [ownedServices, setOwnedServices] = React.useState<string[]>([]);
  
  const [unownedServices, setUnownedServices] = React.useState<string[]>([]);
  
  const retrieveServices = async (userName: string) => {
    let options = {
      method: 'get',
      url: 'http://localhost:8080/videoDB/user',
      params: {
        userName: userName
      }
    };
    let result = await axios(options);
    
    owned = result.data.ownedServices;
    setOwnedServices(owned);
    
    allServices.forEach((service) => {
      if (owned.indexOf(service) === -1) {
        unowned.push(service);
      }
    })
    
    setUnownedServices(unowned);
  }
  
  useEffect(() => {
    retrieveServices(userName);
  }, [])  
  
  const handleDelete = (service: any) => () => {
    
    let index: number = ownedServices.indexOf(service);
    
    let removed: string = ownedServices[index];
    
    ownedServices.splice(index, 1)
    setOwnedServices(ownedServices);
    
    console.log('ownedServices: ', ownedServices);
    unownedServices.push(removed);
    setUnownedServices(unownedServices);
    console.log('unownedServices: ', unownedServices);
    
    let options = {
      method: 'put',
      url: 'http://localhost:8080/videoDB/user/services',
      data: {
        userName: userName,
        services: owned
      }
    }
    
    axios(options)
  };
  
  const handleAdd = (service: any) => () => {
    
    let index: number = unownedServices.indexOf(service);
    
    let added: string = unownedServices[index];
    
    unownedServices.splice(index, 1)
    setUnownedServices(unownedServices);
    
    console.log('unownedServices: ', unownedServices);
    ownedServices.push(added);
    setOwnedServices(ownedServices);
    console.log('ownedServices: ', ownedServices);
    
    let options = {
      method: 'put',
      url: 'http://localhost:8080/videoDB/user/services',
      data: {
        userName: userName,
        services: owned
      }
    }
    
    axios(options)
  };

  return (
    <Paper>
      <OwnedProviders ownedServices={ownedServices} handleDelete={handleDelete} />
      <Divider variant="middle"/>
      <UnownedProviders unownedServices={unownedServices} handleAdd={handleAdd} />
    </Paper>
    
  );
};

