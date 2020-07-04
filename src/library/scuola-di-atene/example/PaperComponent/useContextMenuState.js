import { useState } from 'react';

export default (props) => {
  const [menuInfo, setMenuInfo] = useState({
    anchorEl: null,
    targetShape: null,
    open: false,
  });

  const handleMenuOpen = (anchorEl, targetShape) => {
    setMenuInfo({
      anchorEl,
      targetShape,
      open: true,
    });
  };

  const handleMenuClose = () => {
    setMenuInfo({
      anchorEl: null,
      targetShape: null,
      open: false,
    });
  };

  return {
    menuInfo,
    setMenuInfo,
    handleMenuOpen,
    handleMenuClose,
  };
};
