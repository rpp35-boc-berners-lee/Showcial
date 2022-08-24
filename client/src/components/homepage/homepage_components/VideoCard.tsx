import React from 'react';
import './VideoCard.scss';

type ChildProps = {
  base_url: string;
  backdrop_sizes: string[];
  backdrop_path: string;
  name: string;
}

export const VideoCard:React.FC<ChildProps> = ({ base_url, backdrop_sizes, backdrop_path, name }) => {
   return (
      <>
         <div>
            <img className="video_backdrop" src={`${base_url}${backdrop_sizes[0]}${backdrop_path}`} loading='lazy'/>
            <h4>{name}</h4>
         </div>
      </>
   );
};
