import React, { useState } from 'react';
import {Slider} from './slider/Slider';
import List from './list/List'

type ChildProps = {
  vedios: any,
  config: any
}

type Video = {
  base_url: string;
  backdrop_path: string;
  name: string;
  id: number;
}

export const Recommendations: React.FC<ChildProps> = ({vedios,  config}) => {
  console.log(vedios);
  console.log(config);
  return (
    <div>
      <Slider vedios={vedios} config={config}/>
      <List />
    </div>)
}