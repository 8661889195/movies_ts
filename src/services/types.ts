

export interface Request {
  page: number;
  results: SingleMovie[];
  total_pages: number;
  total_results: number;
}

export interface Genres {
  id: number;
  name: string;
}

export interface SingleMovie {
  filmRateChange: (movieId: number, newRating: number) => void;
  genres: Genres[];
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  rating: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  rating: undefined | number;
}