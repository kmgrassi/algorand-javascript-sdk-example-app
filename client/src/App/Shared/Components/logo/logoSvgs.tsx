import { makeStyles } from '@material-ui/core';
import { navigate } from '@reach/router';
import * as React from 'react';
import { ReactSVG } from 'react-svg';

const svgs = {
  logo: require('../../VectorIcons/Logo.svg'),
};

const styles = makeStyles({
  logo: {
    width: 220,
    textAlign: 'center',
    cursor: 'pointer',
  },
});

export const YellowSvgLogo = () => {
  const classes = styles();
  return (
    <ReactSVG
      src={svgs.logo}
      className={classes.logo}
      onClick={() => navigate('/')}
    />
  );
};
