import { SingleMovie } from '../../services/types';
import { format } from 'date-fns';
import haveNoPoster from './Out_Of_Poster.jpg';
import { StyleMovie, StyleImg, StyleContent } from './MovieCard.style';
import { Rate } from 'antd';
import { GenresList } from '../GenresList/GenresList';
import { RatingNumber } from '../RatingNumber/RatingNumber';


export const MovieCard = (props: SingleMovie) => {
  const { id, poster_path, overview, title, release_date, genre_ids, genres, rating, filmRateChange} = props;   
  
  const releaseDate = release_date === '' ? '' : format(new Date(release_date), 'MMMM d, yyyy');
  
  const imageMovie = poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : haveNoPoster;

  function truncate(numberSymbols: number, useWordBoundary: boolean) {
      if(overview.length <= numberSymbols) {
        return overview;
      }
      const subString = overview.substring(0, numberSymbols - 1);
      return `${useWordBoundary ? subString.substring(0, subString.lastIndexOf(' ')) : subString}...`;
    }

  const overviewTruncated = truncate.apply(overview, [100, true]);

  return <div>
    <StyleMovie>
        <StyleContent>
          <div className="movie-inner">
            <h3 className="movie_title">{title}</h3>
            <span className="card-release-date">{releaseDate}</span>
            <span className="card-overview">{overviewTruncated}</span>
          <RatingNumber evaluation={rating}/>
          <GenresList genres={genres} genre_ids={genre_ids}/>
          <Rate 
          allowHalf 
          count={10}
          style={{fontSize: '15px'}}
          defaultValue={rating}
          onChange={(newRating: number) => {
            filmRateChange(newRating, id);
          }}
          />
          </div>
    </StyleContent>
          <StyleImg className="card-img" src={imageMovie} alt="poster" />
      </StyleMovie>
  </div>
}