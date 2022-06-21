import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, List, ListItem, Popper, Slide, Typography } from '@mui/material';
import FriseChrono from './FriseChrono';
import { Box } from '@mui/system';
import { getExoFromIds } from './utils/getExoFromIds';
import CodeTentative from './CodeTentative';
import CancelIcon from '@mui/icons-material/Cancel';
import { dateParser } from './utils/dateParser';
const PopperDetails = (props) => {
  // const [anchor, setAnchor] = useState(props.anchorEl);
  const open = Boolean(props.anchorEl);
  let exo = props.exo;
  const exercices = props.exercices;
  const handlePopoverClose = props.handlePopoverClose;

  const anchorEl = props.anchorEl;
  const exerciceAffiche = getExoFromIds(
    exo.ownerElement.parentElement.dataset.id,
    exo.nodeValue,
    exercices,
  );
  const nomExo = exerciceAffiche.nomExo;
  const langage = exerciceAffiche.langage;
  const tentatives = exerciceAffiche.tentatives;
  const difficulte = exerciceAffiche.difficulte;
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      disablePortal={false}
      placement={'right'}
      popperOptions={{
        positionFixed: false,
      }}
    >
      {
        <div
          style={{
            border: '3px solid black',
            backgroundColor: 'white',
            width: 'max-content',
          }}
        >
          <IconButton onClick={handlePopoverClose}>
            <CancelIcon></CancelIcon>
          </IconButton>
          {exo == '' || exerciceAffiche == -1 ? (
            ''
          ) : (
            <ListItem
              sx={{
                display: 'flex',
                flex_wrap: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0',
                margin: '0',

                // 70 = la taille d'une icone + le trait de séparation
                width: 95 * exerciceAffiche.tentatives.length + 'px',
                height: 18 * exerciceAffiche.tentatives.length + 'px',
                paddingTop: 1 + exerciceAffiche.tentatives.length + 'em',
                margin: '0 auto',
                paddingRight: 3 - exerciceAffiche.tentatives.length + 'em',
                paddingLeft:
                  exerciceAffiche.tentatives.length >= 5
                    ? 9 - exerciceAffiche.tentatives.length + 'em'
                    : exerciceAffiche.tentatives.length + 'em',
              }}
            >
              <FriseChrono exo={exerciceAffiche}></FriseChrono>
            </ListItem>
          )}
          <ul sx={{ width: '100%', height: '100%' }}>
            <ListItem>
              <Typography variant="h6">
                {exo === '' ? '' : exo.ownerElement.parentElement.dataset.id}
              </Typography>
            </ListItem>
            <List sx={{ display: 'flex' }}>
              <ListItem>
                <Typography>{exo === '' ? '' : nomExo}</Typography>
              </ListItem>
              <ListItem>
                <Typography sx={{ p: 1 }}>{exo === '' ? '' : difficulte}</Typography>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <Typography variant="h6">Tentatives:</Typography>
              </ListItem>
              <List sx={{ display: 'inline-block', overflow: 'auto', height: '50vh' }}>
                {exo === '' || exerciceAffiche == -1
                  ? ''
                  : tentatives.map((tentative) => (
                      <Box key={tentative.id + 'Box'}>
                        <ListItem key={tentative.id + 'dateSoumission'}>
                          {dateParser(tentative.dateSoumission)}
                        </ListItem>
                        <ListItem key={tentative.id + 'Logs'}>
                          <Typography key={tentative.id}>{tentative.logErreurs}</Typography>
                        </ListItem>
                        {langage !== '' && langage !== undefined ? (
                          <CodeTentative
                            code={tentative.reponseEtudiant}
                            key={tentative.id + 'code'}
                            language={langage}
                          ></CodeTentative>
                        ) : (
                          ''
                        )}
                      </Box>
                    ))}
              </List>
            </List>
          </ul>
        </div>
      }
    </Popper>
  );
};

PopperDetails.propTypes = {
  anchorEl: PropTypes.object,
  handlePopoverClose: PropTypes.func,
  open: PropTypes.bool,
  exo: PropTypes.any,
  exercices: PropTypes.array,
};
export default PopperDetails;