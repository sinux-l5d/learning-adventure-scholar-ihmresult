import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from '@pages/Accueil/Accueil';
import Resultat from '@pages/Resultat/Resultat';
import NotFound from '@pages/NotFound/NotFound';
import ResultatEtudiant from '@pages/ResultatEtudiant/ResultatEtudiant';
import Avancement from '@pages/Avancement/Avancement';
import Videoprojecteur from '@pages/Videoprojecteur/Videoprojecteur';
import VisuResultatEtudiant from '@pages/VisuResultatEtudiant/VisuResultatEtudiant';
import VisuResultatExercice from '@pages/VisuResultatExercice/VisuResultatExercice';
import { initSocketConnection } from '@services/socket/socket';
import { useDispatch } from 'react-redux';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    initSocketConnection(dispatch);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/resultat/:etu" element={<ResultatEtudiant />} />
          <Route path="/resultat" element={<Resultat />} />
          <Route path="/avancement" element={<Avancement />} />
          <Route path="/videoprojecteur" element={<Videoprojecteur />} />
          <Route path="/visuresultatetudiant" element={<VisuResultatEtudiant />} />
          <Route path="/visuresultatexercice" element={<VisuResultatExercice />} />
          {/* <Route path="/hello" element={<Hello />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
