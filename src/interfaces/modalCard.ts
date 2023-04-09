export interface IGenre {
  id: number;
  name: string;
}

export interface IModalCard {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  genres: IGenre[];
  runtime: number;
  overview: string;
}
