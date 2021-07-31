import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images, openModal }) => {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li className="ImageGalleryItem" key={id} onClick={openModal}>
          <img
            src={webformatURL}
            alt={tags}
            largeimageurl={largeImageURL}
            className="ImageGalleryItem-image"
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGalleryItem;
