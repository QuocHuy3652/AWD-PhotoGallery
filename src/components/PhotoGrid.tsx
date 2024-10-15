import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Photo } from '../types/types';

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const PhotoGrid: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}`
        );
        setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
        if (response.data.length === 0) setHasMore(false);
      } catch (error) {
        console.error('Error fetching photos', error);
        setError('Unable to load image. Please try again later.');
      }
      setLoading(false);
    };

    fetchPhotos();
  }, [page]);

  useEffect(() => {
    let count = 0;
    const checkScrollPosition = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage((prevPage) => prevPage + 1);
        count++;
        if (count >= 5) {
          clearInterval(intervalId);
        }
      }
    };

    const intervalId = setInterval(() => {
      checkScrollPosition();
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const handleScroll = useCallback(() => {
    console.log(window.innerHeight + window.scrollY, document.body.offsetHeight)
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={3} lg={2} key={photo.id}>
            <Link to={`/photos/${photo.id}`}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '200px',
                  height: '240px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '200px',
                    width: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={photo.urls.thumb}
                    alt={photo.user.name}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textAlign: 'center',
                    marginTop: '8px',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {photo.user.name}
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
      {error && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {loading && <CircularProgress />}
      {!hasMore && <Typography variant="h6">No more photos</Typography>}
    </Box>
  );
};

export default PhotoGrid;
