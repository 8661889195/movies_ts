import { SingleMovie, Genres } from '../../services/types';
import { MovieCard } from '../MovieCard/MovieCard';
import { MovieList } from './MoviesList.style';

interface SingleMovieProps {
  movies?: SingleMovie[];
  genres: Genres[];
  filmRateChange: (movieId: number, newRating: number) => void;
}

export const MoviesList = (props: SingleMovieProps) => {
  const { movies, genres, filmRateChange } = props;
  return <MovieList>
    {movies?.map(item => (
      <MovieCard key={item.id}
      {...item} 
      genres={genres}
      filmRateChange={filmRateChange}
      />
    ))}
  </MovieList>
}