import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.scss';

export function Homepage() {
  const [recommended, setRecommended] = useState(null);
  const [trending, setTrending] = useState(null);
  const [watchList, setWatchList] = useState(null);

  useEffect(() => {
  })

  return (
      <>
        <p>Hello World</p>
      </>
  );
}
