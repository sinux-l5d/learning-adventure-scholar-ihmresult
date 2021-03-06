import React, { useEffect, useState } from 'react';
import DiagrammeCirculaire from '../DiagrammeCirculaire/DiagrammeCirculaire'; //TODO ALIAS SUR LE COMPONENT
import PropTypes from 'prop-types';
import getColor from '@components/Utilitaires/DegradeColorDansTemps';

const DiagrammeCirculaireExercice = (props) => {
  const [time, setTime] = useState(Date.now());
  const exercice = props.exercice;

  const debut = exercice.debut;
  const tempsMoyen = parseInt(exercice.tempsMoyen);
  const estFini = exercice.estFini;
  const nbTentatives = exercice.tentatives.length;
  const difficulte = exercice.difficulte;
  var interval;

  useEffect(() => {
    if (estFini) {
      clearInterval(interval);
    } else {
      interval = setInterval(() => setTime(Date.now()), 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  let textValidation = estFini ? '✔' : `${nbTentatives}`;
  const choisiCouleurSelonNbTentativesEtDifficulte = (nbTentatives, difficulte) => {
    const coulNbTentative = ['#097504', '#F96D0C', '#D10D04'];
    if (nbTentatives <= Math.ceil(difficulte / 2) + 1) {
      return coulNbTentative[0];
    } else if (nbTentatives <= difficulte + 2) {
      return coulNbTentative[1];
    } else {
      return coulNbTentative[2];
    }
  };

  let colorValidation = estFini
    ? '#00ff00'
    : choisiCouleurSelonNbTentativesEtDifficulte(nbTentatives, difficulte);

  let optionsElementCentralAEnvoyer = {
    text: textValidation,
    color: colorValidation, // Par défaut #000000
    fontStyle: 'Arial', // Par défaut Arial
    sidePadding: 1, // Par défaut 20 (pourcentage de padding)
    minFontSize: false, // Par défaut 20 px, false pour qu'il n'y ait pas de min.
    maxFontSize: 800, // Par défaut 75 px.
  };
  const typeDiagrammeAEnvoyer = 'doughnut';

  // Calculs du temps

  let milisActuel;
  if (estFini) {
    // Si l'exercice est terminé, on utilise le temps de sa dernière tentative
    const tentative = exercice.tentatives[exercice.tentatives.length - 1];
    milisActuel = Date.parse(tentative.dateSoumission);
  } else {
    const dateActuel = new Date();
    milisActuel = dateActuel.getTime();
  }

  const milisDebut = Date.parse(debut);
  const tempsEcouleMinute = (milisActuel - milisDebut) / (1000 * 60);
  const tempsRestant = tempsMoyen - tempsEcouleMinute < 0 ? 0 : tempsMoyen - tempsEcouleMinute;
  var dataAEnvoyer = [tempsEcouleMinute, tempsRestant];

  const tailleAEnvoyer = 5;
  const titreAEnvoyer = exercice.nomExo;
  const clickCallbackAEnvoyer = null;
  const idAEnvoyer =
    'diagrammeCirculaireExercice' + exercice.idExo + exercice.idEtu + exercice.idSession;
  const booleanIsInteractiveAEnvoyer = false;
  const couleursAEnvoyer = [
    getColor(exercice, '#00b200', '#b10000', (exo) => (difficulte - 1) / 9),
    getColor(exercice, '#00ff00', '#ff0000', (exo) => (difficulte - 1) / 9),
  ];

  const labelsAEnvoyer = ['Temps écoulé', 'Temps restant'];

  return (
    <div title={'Difficulté : ' + difficulte}>
      <DiagrammeCirculaire
        //definition des props
        datas={dataAEnvoyer}
        taille={tailleAEnvoyer}
        typeDiagramme={typeDiagrammeAEnvoyer}
        titre={titreAEnvoyer}
        couleurs={couleursAEnvoyer}
        clickCallback={clickCallbackAEnvoyer}
        booleanIsInteractive={booleanIsInteractiveAEnvoyer}
        id={idAEnvoyer}
        labels={labelsAEnvoyer}
        optionsElementCentral={optionsElementCentralAEnvoyer}
        displayLegend={props.display}
      />
    </div>
  );
};

DiagrammeCirculaireExercice.propTypes = {
  exercice: PropTypes.object,
  display: PropTypes.bool,
};

export default DiagrammeCirculaireExercice;
