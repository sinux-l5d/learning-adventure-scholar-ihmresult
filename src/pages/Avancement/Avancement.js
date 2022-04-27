import React, { useEffect } from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setExercices } from '@stores/Exercices/exercicesSlice';
import AvancementComponent from '@components/AvancementComponent/AvancementComponent';

const initExercices = (dispatch) => {
  axios.get(process.env.REACT_APP_SRVRESULT_URL + '/exercices').then((res) => {
    console.log('GETTING EXERCICES');
    dispatch(setExercices(res.data.exercices));
  });
  console.log('INIT PAGE');
};

const Avancement = () => {
  const dispatch = useDispatch();
  console.log(useSelector((state) => state.exercices.data));
  useEffect(() => {
    initExercices(dispatch);
  }, []);

  return (
    <Box>
      <Navigation />
      <h2 align="center"> état actuel des étudiants</h2>
      <AvancementComponent />
    </Box>
  );
};

export default Avancement;
