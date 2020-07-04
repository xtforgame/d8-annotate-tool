import { useDrop } from 'react-dnd';

export default (rphPaperRef, {
  onHover = () => {},
  onDrop = () => {},
  ...rest
} = {}) => {
  const [collectedProps, drop] = useDrop({
    hover(item, monitor) {
      // // This is fired very often and lets you perform side effects
      // // in response to the hover. You can't handle enter and leave
      // // here—if you need them, put monitor.isOver() into collect() so you
      // // can just use componentDidUpdate() to handle enter/leave.

      // // You can access the coordinates if you need them
      const clientOffset = monitor.getClientOffset();
      const element = rphPaperRef.current; // eslint-disable-line react/no-find-dom-node
      const componentRect = element.getBoundingClientRect();
      const {
        scrollTop,
        scrollLeft,
      } = element;

      // // You can check whether we're over a nested drop target
      // const isJustOverThisOne = monitor.isOver({ shallow: true });

      // // You will receive hover() even for items for which canDrop() is false
      // const canDrop = monitor.canDrop();

      onHover({
        clientOffset,
        componentRect,
        scrollOffset: {
          x: scrollLeft,
          y: scrollTop,
        },
      });
    },
    drop(item, monitor) {
      onDrop(item);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    ...rest,
  });

  return {
    collectedProps,
    drop,
  };
};
