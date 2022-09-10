import React, { useState, useEffect } from 'react';
import './DetailModal.scss';
import Button from '@mui/material/Button';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Height, SentimentNeutralOutlined, SettingsBackupRestoreRounded } from '@mui/icons-material';
import ReactModal from 'react-modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddToQueueOutlined from '@mui/icons-material/AddToQueueOutlined';
import RemoveFromQueueOutlined from '@mui/icons-material/RemoveFromQueueOutlined'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

interface Props {
  modalIsOpen: boolean,
  setModalIsOpen: any,
  vedio: any,
  image: string,
  closeModal: any,
  userName: string,
  inWatchList?: boolean,
  setInWatchList?: (bool: boolean) => void,
  updateWatchList?: (userName: string) => void,
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ratingStyle = {
  content: {
    top: '70%',
    left: '20%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    background: '#cfe8fc',
    margin: 0
  }
}
ReactModal.setAppElement('#root');

export const DetailModal: React.FC<Props> = ({ modalIsOpen, setModalIsOpen, vedio, image, closeModal, userName, inWatchList, setInWatchList, updateWatchList }) => {
  const [recommendedUsers, SetRecommendedUsers] = useState([]);
  const [platform, SetPlatform] = useState([])

  const [liked, setLiked] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [value, setValue] = React.useState<number | null>(2);
  const [rated, setRated] = useState(false)

  const addToWatchList = async () => {
    await axios.post(`http://localhost:8080/videoDB/user/addToWatchedList`, { userName, video: vedio });
    if (setInWatchList !== undefined) {
      setInWatchList(true);
    }
    if (updateWatchList !== undefined) {
      updateWatchList(userName);
    }
  }

  const removeFromWatchList = async () => {
    await axios.post(`http://localhost:8080/videoDB/user/removeFromWatchedList`, { userName, videoId: vedio.id });
    if (setInWatchList !== undefined) {
      setInWatchList(false);
    }
    if (updateWatchList !== undefined) {
      updateWatchList(userName);
    }
  }

  const addToRecommended = async () => {
    await axios.post(`http://localhost:8080/videoDB/user/addToRecommended`, { userName, vedio });
    setLiked(!liked);
  }

  const addRating = async () => {
    setIsRating(true);
  }

  const closeRating = () => {
    setIsRating(false);
  }

  const submitRating = () => {
    setIsRating(false);
    setRated(true)
  }

  return (
    <div id='details'>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Card sx={{ maxWidth: 800 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                S
              </Avatar>
            }
            action={
              <IconButton aria-label="close" onClick={closeModal}>
                <HighlightOffIcon />
              </IconButton>
            }
            title={vedio.name ? vedio.name : vedio.title}
            subheader={`Released: ${vedio.first_air_date || vedio.release_date}`}
          />
          <CardMedia
            component="img"
            height="660"
            image={image}
            alt="Paella dish"
          />
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={addToRecommended}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton onClick={addRating}>
              {rated ? <StarIcon /> : <StarBorderIcon aria-label="rate" />}
            </IconButton>
            <ReactModal
              isOpen={isRating}
              onRequestClose={closeRating}
              style={ratingStyle}
            >
              <Box
                sx={{
                  '& > legend': { mt: 2 },
                  bgcolor: '#cfe8fc'
                }}
              >
                <Typography component="legend" sx ={{color: 'black'}}>Rate this Video</Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <Button variant="contained" onClick={submitRating}>Submit</Button>
              </Box>
            </ReactModal>
            {inWatchList ?
              <IconButton onClick={removeFromWatchList}>
                <RemoveFromQueueOutlined aria-label="add to watch list" />
              </IconButton> :
              <IconButton onClick={addToWatchList}>
                <AddToQueueOutlined aria-label="remove from watch list" />
              </IconButton>
            }
          </CardActions>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {`Genre: ${vedio.genres[0].name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Description: ${vedio.overview}`}
            </Typography>
          </CardContent>
        </Card>
      </ReactModal>
    </div>
  )
}

