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
  const [isNoResults, setIsNoResults] = useState<boolean>(false);

  const { request, error, isLoading } = useFetch();

  const searchQuery = localStorage.getItem('searchQuery');
  const [query, setQuery] = useState<string>(searchQuery ? JSON.parse(searchQuery) : '');

  useEffect(() => {
    if (query) {
      getCards();
    } else {
      getAllCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllCards = async (): Promise<void> => {
    const cards: IResponce = await request(
      'https://api.themoviedb.org/3/movie/popular?api_key=44a088ecb314cffa890360d57d5748b9&page=1'
    );
    setCardsList(cards.results);
  };

  const getCards = async (): Promise<void> => {
    const cards: IResponce = await request(
      `https://api.themoviedb.org/3/search/movie?api_key=44a088ecb314cffa890360d57d5748b9&page=1&query=${query}`
    );
    if (cards.results.length === 0) {
      setIsNoResults(true);
      setCardsList([]);
      localStorage.setItem('searchQuery', JSON.stringify(query));
    } else {
      setIsNoResults(false);
      setCardsList(cards.results);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setCardsList([]);
    if (query) {
      getCards();
    } else {
      getAllCards();
    }
    localStorage.setItem('searchQuery', JSON.stringify(query));
  };

  return (
    <div className="home" id="home" data-testid="home">
      <h3 className="home__title">Home</h3>
      <SearchBar query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
      {isLoading && <div data-testid="home-loading" className="home__loading"></div>}
      {isNoResults && (
        <div className="home__no-results" data-testid="no-results">
          No results
        </div>
      )}
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
