import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { Card, CardContent } from '@mui/material';

export const SearchItem = (userName: string, index: number) => {
  function fetchForFollowerData (userName: string) {
    return axios.get<any>('http://localhost:8080/videoDB/user', {params: {userName}})
        .then((results: any) => {
           console.log(results.data);
           return results.data;
        })
        .catch((error) => {
           console.log('fetchForFollowerData() Failed', error);
        });
  }

  return (
    <Card style={{ cursor: 'pointer'}} onClick={(event: any) => {
      fetchForFollowerData(userName);
    }}>
      <CardContent>
        {userName}
      </CardContent>
    </Card>
  )
}