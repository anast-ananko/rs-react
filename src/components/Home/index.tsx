import React, { FC, useEffect, useState } from 'react';

import SearchBar from '../SearchBar';
import CardList from '../CardList';
import useFetch from '../../hooks/fetch';
import Modal from '../Modal';
import { ISearchCard } from 'interfaces/searchCard';
import { IResponce } from 'interfaces/responce';

import './home.scss';

const Home: FC = () => {
  const [cardsList, setCardsList] = useState<ISearchCard[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeCardId, setActiveCardId] = useState<number>();

  const { request, error, isLoading } = useFetch();

  const searchQuery = localStorage.getItem('searchQuery');
  const [query, setQuery] = useState<string>(searchQuery ? JSON.parse(searchQuery) : '');

  useEffect(() => {
    getCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCards = async (): Promise<void> => {
    let cards: IResponce;
    try {
      if (!query) {
        cards = await request(
          'https://api.themoviedb.org/3/movie/popular?api_key=44a088ecb314cffa890360d57d5748b9&page=1'
        );
      } else {
        cards = await request(
          `https://api.themoviedb.org/3/search/movie?api_key=44a088ecb314cffa890360d57d5748b9&page=1&query=${query}`
        );
      }
      if (!cards) {
        throw new Error('Failed');
      }
      setCardsList(cards.results);
    } catch {}
  };

  return (
    <div className="home" id="home" data-testid="home">
      <h3 className="home__title">Home</h3>
      <SearchBar query={query} setQuery={setQuery} getCards={getCards} />
      {isLoading && <div data-testid="home-loading" className="home__loading"></div>}
      {cardsList && (
        <CardList cards={cardsList} setShowModal={setShowModal} setActiveCardId={setActiveCardId} />
      )}
      {error && (
        <div className="home__error" data-testid="home__error">
          {error}
        </div>
      )}
      <Modal
        onClose={() => setShowModal(false)}
        showModal={showModal}
        activeCardId={activeCardId}
      />
    </div>
  );
};

export default Home;
