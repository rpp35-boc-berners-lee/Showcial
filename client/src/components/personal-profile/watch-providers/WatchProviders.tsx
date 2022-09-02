import React from 'react';
import './WatchProviders.scss';
import { styled, Chip, Paper, Container, Divider } from '@mui/material';
// import Chip from '@mui/material/Chip';
// import Paper from '@mui/material/Paper';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';

interface Services {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const retrieveOwnedServices = async (userName: string) => {
  try {
    let options = {
      method: 'get',
      url: 'http://localhost:8080/videoDB/user',
      params: {
        userName: userName
      }
    };
    let result = await axios(options);
    console.log('result in retrieveOwnedServices', result.data.ownedServices);
    return result.data.ownedServices;
    
  } catch (error) {
    console.log('Failed to retrieve owned services on the front end', error);
  }
}

export const WatchProviders = ({userName}: {userName: string}) => {
  // Todo: retrieve user's owned services from the database to set up the initial state here
  
  // let servicesData = retrieveOwnedServices(userName); 
  // console.log('servicesData: ', servicesData)
  
  let data = retrieveOwnedServices(userName)
  
  console.log('data: ', data);
  
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
  

  // const handleDelete = (servicesToDelete: Services) => () => {
  //   console.log('servicesToDelete: ', servicesToDelete);
  //   setOwnedServices((services) => services.filter((service) => service.key !== servicesToDelete.key));
  //   console.log(ownedServices);
  // };
  
  // const handleDelete = (servicesToDelete: Services) => () => {
  //   console.log('servicesToDelete: ', servicesToDelete);
  // };
  
  
  
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
      {ownedServices.map((service: string, i: number) => {
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
      {/* {unownedServices.map((service) => {
        console.log('Unowned Providers: ', service);
        return (
          <ListItem key={service.key}>
            <Chip
              label={service.label}
              onDelete={handleDelete(service)}
              deleteIcon={<AddCircleOutlineOutlinedIcon />}
            />
          </ListItem>
        );
      })} */}
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
