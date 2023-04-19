import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hook';
import SearchBar from '../SearchBar';
import CardList from '../CardList';
import Modal from '../Modal';
import { ISearchCard } from '../../interfaces/searchCard';
import { fetchAllCards, fetchCardsWithQuery, setValue } from './homeSlice';

import './home.scss';

const Home: FC = () => {
  const { cardsLoadingStatus, query, cards } = useAppSelector((state) => state.home);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeCardId, setActiveCardId] = useState<number>();
  const [inputQuery, setInputQuery] = useState<string>(query);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query) {
      dispatch(fetchCardsWithQuery(query));
    } else {
      dispatch(fetchAllCards());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(setValue(inputQuery));
    if (inputQuery) {
      dispatch(fetchCardsWithQuery(inputQuery));
    } else {
      dispatch(fetchAllCards());
    }
  };

  const renderCardsList = (arr: ISearchCard[]) => {
    if (arr.length === 0 && cardsLoadingStatus === 'idle') {
      return (
        <div className="home__no-results" data-testid="no-results">
          No results
        </div>
      );
    }
    return <CardList setShowModal={setShowModal} setActiveCardId={setActiveCardId} />;
  };

  const elements = renderCardsList(cards);

  return (
    <div className="home" id="home" data-testid="home">
      <h3 className="home__title">Home</h3>
      <SearchBar
        inputQuery={inputQuery}
        setInputQuery={setInputQuery}
        handleSubmit={handleSubmit}
      />
      {cardsLoadingStatus === 'loading' && (
        <div data-testid="home-loading" className="home__loading"></div>
      )}
      {elements}
      {cardsLoadingStatus === 'error' && (
        <div className="home__error" data-testid="home__error">
          Failed to fetch
        </div>
      )}
      {/* <Modal
        onClose={() => setShowModal(false)}
        showModal={showModal}
        activeCardId={activeCardId}
      /> */}
    </div>
  );
};

export default Home;
