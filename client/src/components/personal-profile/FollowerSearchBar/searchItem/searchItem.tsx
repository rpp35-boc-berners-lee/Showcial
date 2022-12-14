import React from 'react';
import { Card, CardContent, Stack, Avatar } from '@mui/material';

const upperCaseReducer = (string: string) => {
   return string.split('').reduce((pV, cV) => {
      return cV === cV.toUpperCase() ? (pV += cV) : pV;
   }, '');
};

export const SearchItem = (props: any) => {
  return (
    <Card style={{cursor: 'pointer'}} key={props.index} sx={{ m: 1, width: '50ch' }} className="searchItem">
      <Stack className='searchItemTitle' direction="row" spacing={1} justifyContent="left" alignItems="center" onClick={() => {
        props.setFolloweeData(props.followee);
        props.setValue(2);
      }}>
        <Avatar>{upperCaseReducer(props.followee)}</Avatar>
        <CardContent>{props.followee}</CardContent>
      </Stack>
    </Card>
  )
}
