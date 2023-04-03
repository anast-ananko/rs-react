import React, { FC, useEffect, useState, useRef } from 'react';
import SearchBar from '../SearchBar';
import CardList from '../CardList';
import useFetch from '../../hooks/fetch';

import './home.scss';

const Home: FC = () => {
  const [cardsList, setCardsList] = useState([]);
  const { request, error, isLoading } = useFetch();

  const queryObj = localStorage.getItem('searchQuery');
  const queryParseObj = queryObj ? JSON.parse(queryObj) : '';
  const [query, setQuery] = useState<string>(queryParseObj);
  const queryRef = useRef<string | undefined>();

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  useEffect(() => {
    return () => {
      localStorage.setItem('searchQuery', JSON.stringify(queryRef.current));
    };
  }, []);

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async () => {
    try {
      if (!queryRef.current) {
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
          `https://api.themoviedb.org/3/search/movie?api_key=44a088ecb314cffa890360d57d5748b9&page=1&query=${queryRef.current}`
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
      {isLoading && <div>Loading.....</div>}
      {cardsList && <CardList cards={cardsList} />}
      {error && <div>{error}</div>}
    </div>
  );
};

export default Home;
