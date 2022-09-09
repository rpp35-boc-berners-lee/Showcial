import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DetailModal } from '../homepage/homepage_components/DetailModal/DetailModal'

type ChildProps = {
  mediaType: string;
  id: number;
  config: any;
  open: boolean;
  close: (close: boolean) => void;
  inWatchList?: boolean;
  setInWatchList?: (bool: boolean) => void;
  updateWatchList?: () => void;
}

export const VideoDetails:React.FC<ChildProps> = ({ mediaType, id, config, open, close, inWatchList, setInWatchList, updateWatchList }) => {
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
    if (!watchProviders.data.results['US']) {
      return { flatrate: [] }
    }
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
          image={`${config.images.base_url}${config.images.backdrop_sizes[2]}${currentlySelected.backdrop_path}`}
          closeModal={closeModal}
          userName={userName}
          inWatchList={inWatchList}
          setInWatchList={setInWatchList}
          updateWatchList={updateWatchList}
        />
        : null
      }
    </>
  )
}