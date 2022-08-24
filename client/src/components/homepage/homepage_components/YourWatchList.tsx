import React from 'react';
import './YourWatchList.scss';
import { VideoCard } from './VideoCard';

type ChildProps = {
  watchList: any;
  config: any;
}

type Video = {
  base_url: string;
  backdrop_path: string;
  name: string;
}

export const YourWatchList:React.FC<ChildProps> = ({ watchList, config }) => {
   return (
      <>
         <h3>YOUR WATCH LIST</h3>
         {watchList.map((video: Video) => {
          return (
            <VideoCard base_url={video.base_url}
                       backdrop_sizes={config.backdrop_sizes}
                       backdrop_path={video.backdrop_path}
                       name={video.name}
            />
          )
         })}
      </>
   );
};
