// !!!!
// https://stackoverflow.com/questions/14708880/rectangle-selection-of-svg-elements-for-raphael
// http://jsfiddle.net/Wrajf/348/

import React from 'react';
import { compose } from 'recompose';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { withStyles } from '@material-ui/core/styles';
import ProgressWithMask from '~/core/Progress/ProgressWithMask';
// import Divider from '@material-ui/core/Divider';
import PaperComponent from './PaperComponent';
// import RectList from './RectList';
import MainToolBar from './MainToolBar';
import ShapeSelect from './ShapeSelect';
import SdaComponentListH from './SdaComponentListH';
import {
  getRelativeMousePos,
} from './utils/helperFuncs';
import componentSize from './componentSize';
import ItemTypes from './ItemTypes';

// https://stackoverflow.com/a/4819886/1601953
const isTouchDevice = !!('ontouchstart' in window || navigator.maxTouchPoints);

const styles = {
  fullHeight: {
    height: '100%',
  },
  verticalFlexContainer: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    height: '100%',
  },
  verticalFlexContainer2: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  flexContainer2: {
    display: 'flex',
    flexDirection: 'row',
    height: 1,
    flex: 1,
  },
  spacing: {
    flex: 0,
  },
  vPlaceHolder: {
    height: 24,
  },
  infoBlock: {
    width: 130,
  },
  spacing1: {
    flex: 1,
  },
  spacing10: {
    width: 1,
    height: 4,
  },
};

export class SdaEditor extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      image: null,
      loading: false,
      selectedIds: [],
      rectList: [],
      droppedBoxNames: [],
      commandSequenceInfo: {
        currentIndex: -1,
        sequences: [],
      },
    };
  }

  componentDidMount() {
    // this.updateImage('https://www.wallpapersworldonline.com/wp-content/uploads/2014/01/free-wallpaper-for-windows-156.jpg');
    this.updateImage('https://dummyimage.com/1600x1600/0b5697/000000.png&text=+');
  }

  componentWillUnmount() {
  }

  onSelectedIdsChange = (fromUI = true) => ({ selectedIds }) => {
    // console.log('selectedIds :', selectedIds);
    if (fromUI) {
      this.sdaPaper.setSelectionByIds(selectedIds);
    } else {
      this.setState({
        selectedIds,
      });
    }
  }

  onDeleteId = (id) => {
    // console.log('id :', id);
    this.sdaPaper.deleteId(id);
  }

  handleDrop = (item) => {
    const relPosFromDroppable = this.lastDropPos;
    const relPosFromDraggable = getRelativeMousePos(item);

    if (this.sdaPaper) {
      this.sdaPaper.addComponent(
        relPosFromDroppable.x - relPosFromDraggable.x,
        relPosFromDroppable.y - relPosFromDraggable.y,
        componentSize.width,
        componentSize.height,
        componentSize.borderRadius,
        {
          ...item.configs,
          type: item.name,
        }
      );
    }
    // this.sdaPaper.serialize();
  }

  updateImage(imgURL) {
    if (!this.state.image || this.state.image.src !== imgURL) {
      this.setState({
        image: null,
        loading: true,
      });

      const image = new Image();
      image.src = imgURL;
      image.onload = () => {
        this.setState({
          image,
          loading: false,
        });
      };
    }
  }

  isDropped(boxName) {
    // console.log('this.state.lastDropPos :', this.state.lastDropPos);
    return this.state.droppedBoxNames.indexOf(boxName) > -1;
  }

  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.verticalFlexContainer}>
        <div className={classes.verticalFlexContainer2}>
          <div className={classes.flexContainer}>
            <MainToolBar
              commandSequenceInfo={this.state.commandSequenceInfo}
              setCommandToIndex={(...args) => this.sdaPaper.setCommandToIndex(...args)}
              undo={(...args) => this.sdaPaper.undo(...args)}
              redo={(...args) => this.sdaPaper.redo(...args)}
            />
            <div className={classes.spacing1} />
            <ShapeSelect
              list={this.state.rectList}
              selectedIds={this.state.selectedIds}
              onDeleteId={this.onDeleteId}
              onSelectedIdsChange={this.onSelectedIdsChange(true)}
            />
          </div>
        </div>
        {/* <div className={classes.spacing10} />
        <Divider />
        <div className={classes.spacing10} /> */}
        {/* <div className={classes.verticalFlexContainer2}>
          <SdaComponentListH
            list={this.state.rectList}
            selectedIds={this.state.selectedIds}
            onDeleteId={this.onDeleteId}
            onSelectedIdsChange={this.onSelectedIdsChange(true)}
          />
        </div> */}
        {/* <div className={classes.spacing10} />
        <Divider />
        <div className={classes.spacing10} /> */}
        <div className={classes.flexContainer2}>
          <PaperComponent
            accepts={[ItemTypes.basicComponent, ItemTypes.customComponent]}
            onHover={(data) => {
              const ldp = this.lastDropPos || {};
              const lastDropPos = getRelativeMousePos(data);
              if (ldp.x !== lastDropPos.x || ldp.y !== lastDropPos.y) {
                this.lastDropPos = lastDropPos;
              }
            }}
            onDrop={this.handleDrop}
            onSdaPaperChange={(sdaPaper) => {
              this.sdaPaper = sdaPaper;
            }}
            image={this.state.image}
            onSelectedIdsChange={this.onSelectedIdsChange(false)}
            onRectListChange={(rectList) => {
              // console.log('rectList :', rectList);
              this.setState({
                rectList,
              });
            }}
            onSdaCommandSequenceChange={({
              // sequence,
              sequences,
              // sequenceIndex,
              currentIndex,
            }) => {
              this.setState({
                commandSequenceInfo: {
                  // sequence,
                  sequences,
                  // sequenceIndex,
                  currentIndex,
                },
              });
            }}
          />
        </div>
        {/* <div className={classes.verticalFlexContainer2}>
          <RectList
            list={this.state.rectList}
            selectedIds={this.state.selectedIds}
            onDeleteId={this.onDeleteId}
            onSelectedIdsChange={this.onSelectedIdsChange(true)}
          />
        </div> */}
        {(this.state.loading || !this.state.image) && <ProgressWithMask delay={300} />}
      </div>
    );
  }
}

export default compose(
  DragDropContext(isTouchDevice ? TouchBackend({
    enableMouseEvents: true,
    // // allow vertical scrolling
    // scrollAngleRanges: [{ start: 30, end: 150 }, { start: 210, end: 330 }],
    // allow horizontal scrolling
    scrollAngleRanges: [{ start: 300 }, { end: 60 }, { start: 120, end: 240 }],
  }) : HTML5Backend),
  withStyles(styles),
)(SdaEditor);
