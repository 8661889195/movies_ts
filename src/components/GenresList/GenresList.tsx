import { Genres } from '../../services/types';
import { Genre } from '../Genre/Genre';
import { ListStyle } from './GenresList.style';

interface MovieProps {
  genre_ids: number[];
  genres: Genres[];
}

export const GenresList = (props: MovieProps) => {
  const { genres, genre_ids } = props;
  const movieGenres = genres.filter((genre) => genre_ids.includes(genre.id))
  return (
  <ListStyle>
  {movieGenres.map((genre) => (
    <Genre genreName={genre.name} key={genre.id}/>
  ))}
</ListStyle>
)}
  


 
