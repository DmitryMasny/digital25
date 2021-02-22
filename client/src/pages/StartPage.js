import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";

import svgSettings from "../media/svg/settings.svg";

const useStyles = makeStyles( ( theme ) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing( 2 ),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}) );

export const StartPage = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <img src={svgSettings} alt=""/>

      <Grid container spacing={ 3 }>
        <Grid item xs={ 12 }>
          <Paper className={ classes.paper }>xs=12</Paper>
        </Grid>

        <Grid item xs={ 6 }>
          <Paper className={ classes.paper }>xs=6</Paper>
        </Grid>
        <Grid item xs={ 6 }>
          <Paper className={ classes.paper }>xs=6</Paper>
        </Grid>

        <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
          <Paper className={ classes.paper }>xs=3</Paper>
        </Grid>
        <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
          <Paper className={ classes.paper }>xs=3</Paper>
        </Grid>
        <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
          <Paper className={ classes.paper }>xs=3</Paper>
        </Grid>
        <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
          <Paper className={ classes.paper }>xs=3</Paper>
        </Grid>

      </Grid>
    </Container>
  );
}