import React, { useState, useEffect} from 'react';
import './MovieDetailPopup.scss';
import Button from '@mui/material/Button';
import { any } from 'cypress/types/bluebird';

interface Props {
  trigger: Boolean;
  setTrigger: any,
  recommendedUser: any,
  vedio: any,
  platform: String[]
}
export const MovieDetailPopup : React.FC<Props> = ({trigger, setTrigger, recommendedUser, vedio, platform}) => {
  return trigger? <p></p> : <></>;
}