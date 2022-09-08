import React, { useState, useEffect } from 'react';
import './DetailModal.scss';
import Button from '@mui/material/Button';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import { Height } from '@mui/icons-material';
import ReactModal from 'react-modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { env } from 'process';

interface Props {
  modalIsOpen: boolean,
  setModalIsOpen: any,
  vedio: any,
  image: string,
  closeModal: any,
  userName: string
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

ReactModal.setAppElement('#root');

export const DetailModal: React.FC<Props> = ({ modalIsOpen, setModalIsOpen, vedio, image, closeModal }) => {
  const [recommendedUsers, SetRecommendedUsers] = useState([]);
  const [platform, SetPlatform] = useState([])

  const userName = 'JamesFranco';

  const addToWatchList = async () => {
    await axios.post(`http://localhost:8080/videoDB/user/addToWatchedList`, { userName, vedio });
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
                R
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
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton>
              <StarBorderIcon aria-label="rate" />
            </IconButton>
            <IconButton onClick={addToWatchList}>
              <AddCommentOutlinedIcon aria-label="add to recommend" />
            </IconButton>
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

