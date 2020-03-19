import React from 'react';

const FlexRow = (props) => {
  return (
    <div {...props} style={{ display: 'flex', flexDirection: 'row' }} />
  );
};

FlexRow.displayName = 'FlexRow';

export default FlexRow;
