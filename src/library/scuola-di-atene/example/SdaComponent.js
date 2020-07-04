/* eslint-disable react/no-array-index-key */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import SdaComponentDisplay from './SdaComponentDisplay';
import DragPreview from './DragPreview.js';

const componentSource = {
  beginDrag(props, monitor, component) {
    const clientOffset = monitor.getClientOffset();
    const componentRect = findDOMNode(component).getBoundingClientRect(); // eslint-disable-line react/no-find-dom-node
    return {
      clientOffset,
      componentRect,
      name: props.name,
      configs: props.configs || {},
    };
  },
};

class SdaComponent extends React.Component {
  componentDidMount() {
    // const img = new Image();
    // img.onload = () => this.props.connectDragPreview && this.props.connectDragPreview(img);
    // img.src = 'https://assets-cdn.github.com/apple-touch-icon.png';
    this.props.connectDragPreview(getEmptyImage());
  }

  render() {
    const {
      children,
      isDropped,
      isDragging,
      connectDragSource,
      connectDragPreview,
      ...props
    } = this.props;

    return connectDragSource(
      <div>
        <DragPreview {...this.props} />
        <SdaComponentDisplay {...props}>
          {children}
        </SdaComponentDisplay>
      </div>
    );
  }
}


export default compose(
  DragSource(props => props.type, componentSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
)(SdaComponent);
