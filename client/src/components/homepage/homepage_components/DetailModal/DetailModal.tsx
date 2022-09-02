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
  image: string
  closeModal: any
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
export const DetailModal: React.FC<Props> = ({ modalIsOpen, setModalIsOpen, vedio, image, closeModal }) => {
  const [recommendedUsers, SetRecommendedUsers] = useState([]);
  const [platform, SetPlatform] = useState([])
  const[movieDetail, setMovieDetail] = (vedio);
  //not working well
  const fetchAll = async () => {
    const Detail = await axios({
      url: 'https://api.themoviedb.org/3/movie',
      params: {
        api_key: process.env.TOKEN,
        id: vedio.id
      }
  })
  setMovieDetail(Detail);
  console.log('this movie is', movieDetail);
  }
  // it only console.log at the 1st rendering, need fix
  useEffect(() => {
    fetchAll();
    console.log('this movie is', movieDetail);
  }, [])

  return (<ReactModal
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
          <IconButton aria-label="close">
            <HighlightOffIcon onClick={closeModal} />
          </IconButton>
        }
        title={vedio.name}
        subheader={`Released: ${vedio.first_air_date}`}
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
        <IconButton>
          <AddCommentOutlinedIcon aria-label="add to recommend" />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`Genre: ${vedio.original_name}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Description: ${vedio.overview}`}
        </Typography>
      </CardContent>

    </Card>
  </ReactModal>
  )
}

