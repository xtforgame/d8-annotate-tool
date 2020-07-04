/* eslint-disable react/no-array-index-key */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import Button from '@material-ui/core/Button';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import SimpleExpansionCard from '~/core/Cards/SimpleExpansionCard';
import ItemTypes from './ItemTypes';

import SdaComponent from './SdaComponent';

const styles = theme => ({
  root: {
    height: 40 + 120,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
    position: 'relative',
    maxHeight: 300,
  },
  cardRoot: {
    marginTop: 0,
    marginBottom: 4,
  },
  headerRoot: {
    padding: 0,
    paddingLeft: 8,
  },
  cardContainer: {
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    overflow: 'auto',
  },
  cardWrapper: {
    margin: 8,
  },
});

const createComponentConfig = (ins = 3, outs = 2) => ({
  portGroups: {
    ins: Array.from(Array(ins)).map((_, i, a) => ({
      name: `in${i}`,
    })),
    outs: Array.from(Array(outs)).map((_, i, a) => ({
      name: `out${i}`,
    })),
    parents: Array.from(Array(1)).map((_, i, a) => ({
      name: `parent${i}`,
    })),
    children: Array.from(Array(1)).map((_, i, a) => ({
      name: `child${i}`,
    })),
  },
  // mainIcon: 'icons/DroneX.png',
  mainIcon: 'icons/webhook.png',
  width: Math.max(
    Math.max(ins, outs) * 32,
    64
  ),
  // height: 64,
});

class SdaComponentListH extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <SimpleExpansionCard
        defaultExpanded
        title={(
          <Typography
            variant="body1"
            component="pre"
            color="textSecondary"
          >
            Components
          </Typography>
        )}
        withoutCardContent
        cardClassName={classes.cardRoot}
        headerClassName={classes.headerRoot}
      >
        <div className={classes.cardContainer}>
          <div className={classes.cardWrapper}>
            <SdaComponent name="In1 Out1" configs={createComponentConfig(1, 1)} type={ItemTypes.basicComponent} />
          </div>
          <div className={classes.cardWrapper}>
            <SdaComponent name="In1 Out2" configs={createComponentConfig(1, 2)} type={ItemTypes.basicComponent} />
          </div>
          <div className={classes.cardWrapper}>
            <SdaComponent name="In1 Out3" configs={createComponentConfig(1, 3)} type={ItemTypes.basicComponent} />
          </div>
          <div className={classes.cardWrapper}>
            <SdaComponent name="In2 Out1" configs={createComponentConfig(2, 1)} type={ItemTypes.basicComponent} />
          </div>
          <div className={classes.cardWrapper}>
            <SdaComponent name="In2 Out2" configs={createComponentConfig(2, 2)} type={ItemTypes.customComponent} />
          </div>
          <div className={classes.cardWrapper}>
            <SdaComponent name="In2 Out3" configs={createComponentConfig(2, 3)} type={ItemTypes.customComponent} />
          </div>
          <div className={classes.cardWrapper}>
            <SdaComponent name="In3 Out1" configs={createComponentConfig(3, 1)} type={ItemTypes.customComponent} />
          </div>
          <div className={classes.cardWrapper}>
            <SdaComponent name="In3 Out2" configs={createComponentConfig(3, 2)} type={ItemTypes.customComponent} />
          </div>
          <div className={classes.cardWrapper}>
            <SdaComponent name="In3 Out3" configs={createComponentConfig(3, 3)} type={ItemTypes.customComponent} />
          </div>
        </div>
      </SimpleExpansionCard>
    );

    // return (
    //   <ExpansionPanel>
    //     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
    //       {/* <Typography variant="body2">Components</Typography> */}
    //       <Button>Components</Button>
    //     </ExpansionPanelSummary>
    //     <ExpansionPanelDetails>
    //       <div className={classes.cardContainer}>
    //         <div className={classes.cardWrapper}>
    //           <SdaComponent name="Basic 1" configs={createComponentConfig()} type={ItemTypes.basicComponent} />
    //         </div>
    //         <div className={classes.cardWrapper}>
    //           <SdaComponent name="Basic 2" configs={createComponentConfig()} type={ItemTypes.basicComponent} />
    //         </div>
    //         <div className={classes.cardWrapper}>
    //           <SdaComponent name="Custom 1" configs={createComponentConfig()} type={ItemTypes.customComponent} />
    //         </div>
    //         <div className={classes.cardWrapper}>
    //           <SdaComponent name="Custom 2" configs={createComponentConfig()} type={ItemTypes.customComponent} />
    //         </div>
    //       </div>
    //     </ExpansionPanelDetails>
    //   </ExpansionPanel>
    // );
  }
}

export default withStyles(styles)(SdaComponentListH);
