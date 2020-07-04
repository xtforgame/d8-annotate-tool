import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import SdaComponentDisplay from './SdaComponentDisplay';

function collect(monitor) {
  return {
    sourceOffset: monitor.getSourceClientOffset(),
  };
}

class DragPreview extends Component {
  getLayerStyles() {
    const { sourceOffset } = this.props;

    return {
      transform: sourceOffset ? `translate(${sourceOffset.x}px, ${sourceOffset.y}px)` : '',
    };
  }

  render() {
    const {
      children,
      isDropped,
      isDragging,
      connectDragSource,
      connectDragPreview,
      sourceOffset,
      ...props
    } = this.props;
    if (!isDragging) { return null; }

    return (
      <SdaComponentDisplay {...props} isDragPreview style={this.getLayerStyles()}>
        {children}
      </SdaComponentDisplay>
    );
  }
}

// DragPreview.propTypes = {
//   isDragging: PropTypes.bool,
//   sourceOffset: PropTypes.shape({
//     x: PropTypes.number.isRequired,
//     y: PropTypes.number.isRequired,
//   }),
// };

export default DragLayer(collect)(DragPreview);
