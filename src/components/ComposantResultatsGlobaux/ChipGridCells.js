import { Chip } from '@mui/material';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import PanToolIcon from '@mui/icons-material/PanTool';
import { colorGradient } from './utils/colorGradient';
import { calculateTimeBetween } from './utils/dateParser';
const ChipGridCells = (props) => {
  let resolue = false;
  if (props.exercices !== undefined) {
    props.exercices.aides.forEach((element) => {
      resolue = element.resolue;
    });
  }

  const ChipMemo = function renderChip(props) {
    return <Chip {...props} sx={cellsStyle(props)} />;
  };
  var boolean = calculateTimeBetween(
    props?.exercices?.debut,
    props?.exercices?.tempsMoyen,
    props?.exercices?.tentatives[props.exercices?.tentatives.length - 1]?.dateSoumission,
  );
  const cellsStyle = useCallback(
    function (params) {
      if (params.label !== '') {
        console.log('params', params, 'boolean', boolean);
        let style = {
          backgroundColor: colorGradient(params.label, boolean),
        };
        return style;
      }
    },
    [props, boolean],
  );
  return (
    <>
      {props.label !== '' ? <ChipMemo {...props} sx={cellsStyle(props.label)}></ChipMemo> : <></>}
      {props?.exercices !== undefined &&
      props?.exercices.estFini != true &&
      resolue == false &&
      props?.exercices.aides.length > 0 ? (
        <PanToolIcon></PanToolIcon>
      ) : null}
    </>
  );
};

ChipGridCells.propTypes = {
  label: PropTypes.string.isRequired,
  exercices: PropTypes.object.isRequired,
};

export default React.memo(ChipGridCells);
