import { useState } from 'react';

export default (sdaPaperRef, image) => {
  const [imageInfo, setImageInfo] = useState({});
  const updateImage = () => {
    if (!image) {
      return;
    }
    if (image.src && image.src !== imageInfo.src) {
      if (imageInfo.shape) {
        imageInfo.shape.remove();
      }

      sdaPaperRef.current.setSize(image.width, image.height);
      // sdaPaperRef.current.rphPaper.setViewBox(0, 0, 100, 100, false);
      sdaPaperRef.current.clearCompnents();

      setImageInfo({
        src: image.src,
        shape: sdaPaperRef.current.image([image.src, 0, 0, image.width, image.height]).toBack(),
      });
    }
  };
  return {
    imageInfo,
    setImageInfo,
    updateImage,
  };
};
