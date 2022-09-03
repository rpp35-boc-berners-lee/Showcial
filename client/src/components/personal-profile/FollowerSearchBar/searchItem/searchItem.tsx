import React from 'react';
import { Card, CardContent } from '@mui/material';

export const SearchItem = (props: any) => {
  return (
    <Card style={{cursor: 'pointer'}} key={props.index} onClick={() => {
      props.setFolloweeData(props.followee);
      props.setValue(2);
    }}>
      <CardContent>
        {props.followee}
      </CardContent>
    </Card>
  )
}