import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Box, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { PhotoDetails } from '../types/types';
import { useNavigate } from 'react-router-dom';

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const DetailPhoto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<PhotoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchPhotoDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`
        );
        setPhoto(response.data);
      } catch (error) {
        console.error('Error fetching photo details', error);
        setError('Unable to load image. Please try again later.');
      }
      setLoading(false);
    };

    fetchPhotoDetails();
  }, [id]);

  const handleBackToHome = () => {
    navigate('/photos');
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!photo) {
    return <Card sx={{ display: 'flex', maxWidth: 1200, margin: 'auto', boxShadow: 3, p: 4, bgcolor: 'transparent', background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', }}>
      <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h5" color="black" sx={{ m: 5 }}>
          {error}
        </Typography>
        <Button
          variant="contained"
          onClick={handleBackToHome}
          sx={{
            mt: 5,
            background: 'linear-gradient(135deg, #2196F3, #9C27B0)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #9C27B0, #2196F3)',
            },
          }}
        >
          Back to home
        </Button>
      </Box>

    </Card>
  }



  return (
    <Card sx={{ display: 'flex', maxWidth: 1200, margin: 'auto', boxShadow: 3, p: 4, bgcolor: 'transparent', background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', }}>
      <CardMedia
        component="img"
        sx={{
          height: '80vh',
          width: 'auto',
          objectFit: 'cover',
        }}
        image={photo.urls.full}
        alt={photo.user.name}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'white' }}>
        <Typography variant="h4">PHOTO DETAIL</Typography>
        <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
          <Typography variant="body1" sx={{ mt: 1, textAlign: 'left' }}>
            <b>Title</b>: {photo.description || 'No title available'}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, textAlign: 'left' }}>
            <b>Author</b>: {photo.user.name || 'No author available'}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, textAlign: 'left' }}>
            <b>Description</b>: {photo.alt_description || 'No description available'}
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleBackToHome}
          sx={{
            mt: 5,
            background: 'linear-gradient(135deg, #2196F3, #9C27B0)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #9C27B0, #2196F3)',
            },
          }}
        >
          Back to home
        </Button>
      </CardContent>
    </Card>
  );
};

export default DetailPhoto;
