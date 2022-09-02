import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { Card, CardContent } from '@mui/material';

export const SearchItem = (props: any) => {
  return (
    <Card style={{cursor: 'pointer'}} key={props.index} onClick={(event: any) => {
      props.setFolloweeData(props.followee);
      props.setValue(2);
    }}>
      <CardContent>
        {props.followee}
      </CardContent>
    </Card>
  )
}