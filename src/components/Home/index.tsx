import React, { FC, useEffect, useState } from 'react';
import SearchBar from '../SearchBar';
import CardList from '../CardList';
import useFetch from '../../hooks/fetch';

import Modal from '../Modal';

import './home.scss';

const Home: FC = () => {
  const [cardsList, setCardsList] = useState([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeCardId, setActiveCardId] = useState<number>();
  const { request, error, isLoading } = useFetch();

  const queryObj = localStorage.getItem('searchQuery');
  const queryParseObj = queryObj ? JSON.parse(queryObj) : '';
  const [query, setQuery] = useState<string>(queryParseObj);

  useEffect(() => {
    getCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCards = async () => {
    try {
      if (!query) {
        const cards = await request(
          'https://api.themoviedb.org/3/movie/popular?api_key=44a088ecb314cffa890360d57d5748b9&page=1'
        );
        if (cards) {
          setCardsList(cards.results);
        } else {
          throw new Error('Failed');
        }
      } else {
        const cards = await request(
          `https://api.themoviedb.org/3/search/movie?api_key=44a088ecb314cffa890360d57d5748b9&page=1&query=${query}`
        );
        if (cards) {
          setCardsList(cards.results);
        } else {
          throw new Error('Failed');
        }
      }
    } catch {}
  };

  return (
    <div className="home">
      <h3 className="home__title">Home</h3>
      <SearchBar query={query} setQuery={setQuery} getCards={getCards} />
      {isLoading && <div className="home__loading"></div>}
      {cardsList && (
        <CardList cards={cardsList} setShowModal={setShowModal} setActiveCardId={setActiveCardId} />
      )}
      {error && <div className="home__error">{error}</div>}
      <Modal onClose={() => setShowModal(false)} show={showModal} activeCardId={activeCardId} />
    </div>
  );
};

export default Home;
