import React, { useEffect } from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setExercices } from '@stores/Exercices/exercicesSlice';
import { useParams } from 'react-router-dom';
import VisuResultatEtudiantComponent from '@components/VisuResultatEtudiant/VisuResultatEtudiantComponent';

console.log('début page');
const initExercices = (dispatch) => {
  console.log('début');
  axios.get(process.env.REACT_APP_SRVRESULT_URL + '/exercices').then((res) => {
    console.log('GETTING EXERCICES');
    dispatch(setExercices(res.data.exercices));
  });
  console.log('INIT PAGE');
};

const VisuResultatEtudiant = () => {
  const dispatch = useDispatch();
  console.log(useSelector((state) => state.exercices.data));

  useEffect(() => {
    initExercices(dispatch);
  }, []);

  //TODO : Choisir la session (pour l instant session1) :
  return (
    <Box>
      <Navigation />

      <h2 align="center"> État actuel de la séance : </h2>

      <VisuResultatEtudiantComponent />
    </Box>
  );
};

export default VisuResultatEtudiant;
