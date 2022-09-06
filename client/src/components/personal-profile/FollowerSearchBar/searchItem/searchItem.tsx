import React from 'react';
import { Card, CardContent, Stack, Avatar } from '@mui/material';

const upperCaseReducer = (string: string) => {
  return string.split('').reduce((pV, cV) => {
    return (cV === cV.toUpperCase()) ? pV += cV : pV;
  }, '')
};

export const SearchItem = (props: any) => {
  return (
    <Card style={{cursor: 'pointer'}} key={props.index} sx={{ m: 1, width: '25ch' }} onClick={() => {
      props.setFolloweeData(props.followee);
      props.setPreviousValue(props.value)
      props.setValue(2);
    }}>
      <Stack direction="row" spacing={1} justifyContent="left" alignItems="center">
        <Avatar>{upperCaseReducer(props.followee)}</Avatar>
        <CardContent>{props.followee}</CardContent>
      </Stack>
    </Card>
  )
}