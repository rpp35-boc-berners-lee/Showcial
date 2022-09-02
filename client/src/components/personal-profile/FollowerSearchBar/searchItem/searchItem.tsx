import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import {
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Typography,
  Shadows,
  Divider,
  Button,
  TextField
} from '@mui/material';

export const SearchItem = (userName: string) => {
  return (
    <div>
      {userName}
    </div>
  )
}