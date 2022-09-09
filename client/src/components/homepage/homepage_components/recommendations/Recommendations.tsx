import React, { useState } from 'react';
import {Slider} from './slider/Slider';
import List from './list/List'

type ChildProps = {
  vedios: any;
  config: any;
  userName: string;
  mediaType: string;
  getSelected: (id: number, type: string) => void;
  inWatchList?: boolean,
  setInWatchList?: (bool: boolean) => void,
  updateWatchList?: () => void,
}

export const Recommendations: React.FC<ChildProps> = ({vedios,  config, userName, mediaType, getSelected, inWatchList, setInWatchList, updateWatchList }) => {
  return (
    <div>
      <Slider
        vedios={vedios}
        config={config}
        userName={userName}
        mediaType={mediaType}
        inWatchList={inWatchList}
        setInWatchList={setInWatchList}
        updateWatchList={updateWatchList}
      />
      <List  mediaType={mediaType} trendingOrRecommended={'trending'} getSelected={getSelected}/>
    </div>)
}