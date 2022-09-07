import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DetailModal } from '../homepage/homepage_components/DetailModal/DetailModal'

type ChildProps = {
  mediaType: string;
  id: number;
  config: any;
  open: boolean;
  close: (close: boolean) => void;
}

export const VideoDetails:React.FC<ChildProps> = ({ mediaType, id, config, open, close }) => {
  const [currentlySelected, setCurrentlySelected] = useState<any>();
  // temp username
  const [userName, setUserName] = useState('JamesFranco');

  useEffect(() => {
    close(open);
  }, [currentlySelected])

  useEffect(() => {
    getVideoDetail(id);
  }, [open])

  const getVideoDetail = async (id: number) => {
    let videoDetail = await axios.get(`http://localhost:8080/tmdb/${mediaType}/${id}`);
    videoDetail.data.media_type = mediaType;
    videoDetail.data.watchProviders = await getWatchProviders(id);
    setCurrentlySelected(videoDetail.data);
  }

  const getWatchProviders = async (id: number) => {
    let watchProviders = await axios.get(`http://localhost:8080/tmdb/${mediaType}/${id}/watch/providers`);
    return watchProviders.data.results['US'];
  }

  const closeModal = () => {
    close(false);
  }

  return (
    <>
      {currentlySelected
        ? <DetailModal
          modalIsOpen={open}
          setModalIsOpen={close}
          vedio={currentlySelected}
          image={`${config.images.base_url}${config.images.poster_sizes[6]}${currentlySelected.poster_path}`}
          closeModal={closeModal}
          userName={userName}
        />
        : null
      }
    </>
  )
}