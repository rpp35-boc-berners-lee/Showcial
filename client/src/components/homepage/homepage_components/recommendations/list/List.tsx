import React, {useState} from 'react';
import {TrendingOrRecommendedVideos} from '../../trending/TrendingVideos'

export default function List({mediaType, trendingOrRecommended, getSelected}: {mediaType: string, trendingOrRecommended: string, getSelected: (id: number, type: string) => void;}) {
  return <div>
    {/* <p>Recommendations List</p> */}
    {/* <TrendingOrRecommendedVideos mediaType={mediaType} trendingOrRecommended={'recommended'} getSelected={getSelected}/> */}
  </div>
}
