import React, { useEffect } from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
// import HelloComponent from '@components/HelloComponent/HelloComponent';
import { useSelector, useDispatch } from 'react-redux';
import { setExercices } from '@stores/Exercices/exercicesSlice';

const initExercices = (dispatch) => {
  axios.get(process.env.REACT_APP_SRVRESULT_URL + '/exercices').then((res) => {
    dispatch(setExercices(res.data.exercices));
  });
};

const Accueil = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    initExercices(dispatch);
  }, []);

  return (
    <Box>
      <Navigation />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '50px',
        }}
      >
        <Typography variant="h2">Bienvenue sur LaWeb</Typography>
      </Box>
    </Box>
  );
};

export default Accueil;
