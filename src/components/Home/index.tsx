import React, { FC, useEffect, useState } from 'react';
import SearchBar from '../SearchBar';
import CardList from '../CardList';
import flowers from '../../data/flowers.json';
import useFetch from '../../hooks/fetch';

import './home.scss';

const Home: FC = () => {
  const [cardsList, setCardsList] = useState([]);
  // const [query, setQuery] = useState<string>([]);

  const { request, error, isLoading } = useFetch();

  const getCards = async (query = '') => {
    const cards = await request(
      `https://api.themoviedb.org/3/movie/popular?api_key=44a088ecb314cffa890360d57d5748b9&page=1&query=${query}`
    );
    console.log(cards);
    setCardsList(cards.results);
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div className="home">
      <h3 className="home__title">Home</h3>
      <SearchBar />
      <CardList cards={cardsList} />
    </div>
  );
};

export default Home;
