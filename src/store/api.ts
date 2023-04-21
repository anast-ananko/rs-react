import usefetch from '../hooks/fetch';

const getData = async () => {
  const { request } = usefetch();
  const data = await request(
    'https://api.themoviedb.org/3/movie/popular?api_key=44a088ecb314cffa890360d57d5748b9&page=1'
  );
};
