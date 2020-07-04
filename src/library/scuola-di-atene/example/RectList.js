/* eslint-disable react/no-array-index-key */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: 360,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  selected: {
    color: red[500],
  },
});

class RectList extends React.Component {
  onSelectedIdsChange = i => () => {
    if (this.props.onSelectedIdsChange) {
      this.props.onSelectedIdsChange(i);
    }
  };

  onDeleteId = id => () => {
    if (this.props.onDeleteId) {
      this.props.onDeleteId(id);
    }
  };

  render() {
    const { classes, list = [], selectedIds = [] } = this.props;

    return (
      <List className={classes.root} subheader={<div />}>
        <div key={`section-${'sectionId'}`} className={classes.listSection}>
          <ListSubheader>Rects</ListSubheader>
          {list.map((shape, i) => {
            const className = (selectedIds.includes(shape.id)) ? classes.selected : undefined;
            return (
              <ListItem
                button
                key={`item-sectionId-${i}`}
                onClick={this.onSelectedIdsChange([shape.id])}
              >
                <ListItemText
                  primary={<Typography variant="body2" className={className}>{`Rect ${shape.id}`}</Typography>}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={this.onDeleteId(shape.id)}
                    aria-label="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </div>
      </List>
    );
  }
}

export default withStyles(styles)(RectList);
