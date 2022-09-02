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
    let owned = result.data.ownedServices;
    setOwnedServices(owned);
    
    let unOwned: string[] = [];
    
    allServices.forEach((service) => {
      if (owned.indexOf(service) === -1) {
        unOwned.push(service);
      }
    })
    
    setUnownedServices(unOwned);
  }
  
  useEffect(() => {
    console.log('Owned: ', ownedServices);
    console.log('Unowned: ', unownedServices);
    retrieveServices(userName);
  }, [])
  
  
  // const [ownedServices, setOwnedServices] = React.useState([
  //   { key: 0, label: 'Netflix' },
  //   { key: 1, label: 'Hulu' },
  //   { key: 2, label: 'Disney+' },
  // ]);
  
  // const [unownedServices, setUnownedServices] = React.useState([
  //   { key: 3, label: 'HBO Max' },
  //   { key: 4, label: 'Prime Video' },
  // ]);
  
  
  
  // useEffect(() => {

  // })
  

  // const handleDelete = (servicesToDelete: any) => () => {
  //   console.log('servicesToDelete: ', servicesToDelete);
  //   setOwnedServices((services) => services.filter((service) => service.key !== servicesToDelete.key));
  //   console.log(ownedServices);
  // };
  
  const handleDelete = (servicesToDelete: any) => () => {
    // console.log('servicesToDelete: ', servicesToDelete);
  };
  
  
  
  const OwnedProviders = () => {
    // console.log('ownedServices: ', ownedServices)
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
  
  
  
  const handleAdd = (serviceToAdd: any) => {
    
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
              onDelete={handleDelete(service)}
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

