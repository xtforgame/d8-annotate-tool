/* eslint-disable react/no-array-index-key */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ItemTypes from './ItemTypes';

import SdaComponent from './SdaComponent';

const styles = theme => ({
  root: {
    width: 120,
    maxWidth: 120,
    // backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    // flexDirection: 'column',
  },
  cardWrapper: {
    margin: 8,
  },
});

class SdaComponentListV extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="body2">Components</Typography>
        <div className={classes.cardContainer}>
          <div className={classes.cardWrapper}>
            <SdaComponent name="Basic 1" configs={{}} type={ItemTypes.basicComponent} />
          </div>
          <div className={classes.cardWrapper}>
            <SdaComponent name="Basic 2" configs={{}} type={ItemTypes.basicComponent} />
          </div>
          <div className={classes.cardWrapper}>
            <SdaComponent name="Custom 1" configs={{}} type={ItemTypes.customComponent} />
          </div>
          <div className={classes.cardWrapper}>
            <SdaComponent name="Custom 2" configs={{}} type={ItemTypes.customComponent} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SdaComponentListV);
