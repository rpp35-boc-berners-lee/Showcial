import React, { useEffect } from 'react';
import './WatchProviders.scss';
// import OwnedServices from '../owned-services/OwnedServes';
// import UnownedServices from '../unowned-services/UnownedServices';
import { styled, Chip, Paper, Container, Divider } from '@mui/material';
// import Chip from '@mui/material/Chip';
// import Paper from '@mui/material/Paper';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';


// interface Services {
//   key: number;
//   label: string;
// }

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

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
    console.log('Owned: ', ownedServices);
    console.log('Unowned: ', unownedServices);
    retrieveServices(userName);
  }, [])
  
  const handleDelete = (service: any) => () => {
    
    let index: number = ownedServices.indexOf(service);
    
    let removed: string = ownedServices[index];
    
    owned.splice(index, 1)
    setOwnedServices(owned);
    unowned.push(removed);
    setUnownedServices(unowned);
    
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
    ownedServices.push(added);
    setOwnedServices(ownedServices);
    
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
  
  const OwnedProviders = () => {
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
        console.log('Owned Providers: ', service);
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
  
  const UnownedProviders = () => {
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
        console.log('Unowned Providers: ', service);
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

  return (
    <Paper>
      <OwnedProviders />
      <Divider variant="middle"/>
      <UnownedProviders />
    </Paper>
    
  );
};

