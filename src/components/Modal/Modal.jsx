import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = props => {
  // Додає EventListener для відстеження натискання кнопок
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDowm);

    // При розмонтуванні
    return () => {
      window.removeEventListener('keydown', handleKeyDowm);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //Закриває модалку при натисканні кнопки Escape
  const handleKeyDowm = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      props.closeModal();
    }
  };

  //Закриває модалку при кліку в оверлей
  const handleClick = e => {
    if (e.target === e.currentTarget) {
      props.closeModal();
    }
  };

  return (
    <div className="Overlay" onClick={handleClick}>
      <div className="Modal">
        <img src={props.largeimageurl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeimageurl: PropTypes.string.isRequired,
};

export default Modal;
