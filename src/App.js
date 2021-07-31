import { useState, useEffect } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import ApiServiseFetch from './components/ApiServise/ApiServise';
import Loader from './components/Loader/Loader';

const App = () => {
  const [stateImages, setStateImages] = useState([]);
  const [stateQuery, setStateQuery] = useState('');
  const [statePage, setStatePage] = useState(1);
  const [stateShowModal, setStateShowModal] = useState(false);
  const [stateLargeimageurl, setStateLargeimageurl] = useState('');
  const [stateIsLoading, setStateIsLoading] = useState(false);

  // Приймає searchQuery з Searchbar і записує в query
  const formSubmitHandler = searchQuery => {
    setStateQuery(searchQuery);
    setStatePage(1);
    setStateImages([]);
  };

  useEffect(() => {
    // setTimeout для того, щоб встиг показатися Loader
    if (stateQuery === '') {
      return;
    }

    //fetch
    setStateIsLoading(true);
    setTimeout(() => {
      ApiServiseFetch(stateQuery, statePage)
        .then(response => {
          setStateImages(prevState => [...prevState, ...response.data.hits]);
        })
        .finally(
          setStateIsLoading(false),
          setTimeout(() => {
            scrollToButton();
          }, 500),
        );
    }, 400);
  }, [stateQuery, statePage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Відкриття модалки
  // setTimeout для того, щоб встиг показатися Loader
  const openModal = e => {
    setStateIsLoading(true);

    setTimeout(() => {
      setStateShowModal(true);
      setStateLargeimageurl(e.target.getAttribute('largeimageurl'));
      setStateIsLoading(false);
    }, 300);
  };

  // Закриття модалки
  const closeModal = () => {
    setStateShowModal(false);
    setStateLargeimageurl('');
  };

  const incremenpPage = () => {
    setStatePage(prevState => prevState + 1);
  };

  // Автоскрол після fetch
  const scrollToButton = () => {
    if (statePage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery openModal={openModal} images={stateImages} />
      {stateImages.length > 0 && <Button onClick={incremenpPage}></Button>}
      {stateShowModal && (
        <Modal
          closeModal={closeModal}
          largeimageurl={stateLargeimageurl}
        ></Modal>
      )}
      {stateIsLoading && <Loader class={'Loader'}></Loader>}
    </>
  );
};

export default App;
