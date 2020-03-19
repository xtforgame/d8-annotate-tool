import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
    position: 'relative',
  },
  swipeableViewInfoText: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
  },
  swipeableViewActionsOuter: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  swipeableViewActionsInner: {
    display: 'flex',
  },
}));

export default (props) => {
  const { images = [] } = props;
  const [imgIndex, setImgIndex] = useState(0);
  const classes = useStyles();

  const slideRenderer = (params) => {
    const { index, key } = params;

    let realImgIndex = index % images.length;
    if (realImgIndex < 0) {
      realImgIndex += images.length;
    }
    return (
      <CardMedia
        key={key}
        className={classes.media}
        image={images[realImgIndex]}
        title="Contemplative Reptile"
      />
    );
  };

  let currentImgIndex = imgIndex % images.length;
  if (currentImgIndex < 0) {
    currentImgIndex += images.length;
  }

  return (
    <div className={classes.media}>
      <VirtualizeSwipeableViews
        index={imgIndex}
        {...{}/* onChangeIndex={this.handleChangeIndex} */}
        style={{ flex: 1 }}
        // containerStyle={{ height: '100%', position: 'relative' }}
        disabled
        slideRenderer={slideRenderer}
      />
      <Typography color="primary" className={classes.swipeableViewInfoText}>
        {`${currentImgIndex + 1}/${images.length}`}
      </Typography>
      <div className={classes.swipeableViewActionsOuter}>
        <div className={classes.swipeableViewActionsInner}>
          <IconButton
            aria-label="Preious"
            onClick={() => {
              setImgIndex(imgIndex - 1);
            }}
          >
            <KeyboardArrowLeft color="primary" style={{ fontSize: 48 }} />
          </IconButton>
          <div style={{ flex: 1 }} />
          <IconButton
            aria-label="Preious"
            onClick={() => {
              setImgIndex(imgIndex + 1);
            }}
          >
            <KeyboardArrowRight color="primary" style={{ fontSize: 48 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
