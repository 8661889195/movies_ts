import { useEffect, useState } from 'react';
import { MovieDBService } from "./services/services";
import { MoviesList } from '../src/components/MoviesList/MoviesList';
import { Request, SingleMovie, Movie } from '../src/services/types';
import { Navigation } from '../src/components/Navigation/Navigation';
import { Pagination, Spin } from 'antd';
import _ from 'lodash';
import { Search } from '../src/components/Search/Search';

export const App = () => {
  const callMovieService = new MovieDBService();

  const [request, setRequest] = useState<Request>();
  const [movies, setMovies] = useState<SingleMovie[]>()
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState('return')
  const [navigate, setNavigate] = useState(1) 
  const [genres, setGenres] = useState([])  
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState(1)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const localPage = window.localStorage.getItem('page')
    setCurrentPage(Number(localPage))
  }, [currentPage])
  
  useEffect(() => {
    searchMovies(value, currentPage)
  }, [value, currentPage])

  useEffect(() => {
    callMovieService.getGenresList()
    .then(response => setGenres(response.genres))
  }, [value])

  const debaucedHandler = _.debounce((value: string) => {
    if (value) {
        setLoading(true);
        searchMovies(value, currentPage);
    }
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setValue(e.target.value);
    debaucedHandler(e.target.value)
 } 

  const paginationChange = (page: number): void => {
    setCurrentPage(page)
    setLoading(false)
  }

  const searchMovies = (value: string, currentPage: number) => {
    callMovieService.getAllMovie(value, currentPage)
    .then((response) => {
      setRequest(response)
      setTotal(response.total_pages)
      return response
    })
    .then((response) => { response.results.forEach((item) => {
        const filmStorage: string | null = window.localStorage.getItem('rated-films');
      if(filmStorage) {
        const arrFilmStorage = JSON.parse(filmStorage);
        arrFilmStorage.forEach((withRate: Movie) => {
          if(item.id === withRate.id) {
          item.rating = withRate.rating || 0;
        }
      })
    }
    })
    setMovies(response.results)
    setLoading(false)
    })
  }

  const filmRateChange = (newRating: number, movieId: number) => {            
    const newMovieArray = movies?.map((item) => 
    item.id === movieId ? {...item, rating: newRating } : item );
    setMovies(newMovieArray)
    setLoading(false)
  
    const filmStorage = window.localStorage.getItem('rated-films');
    const storagedFilms = filmStorage ? JSON.parse(filmStorage) : [];
    
    const isMovieInStorage = storagedFilms.find((item: Movie) => item.id === movieId);
    if(isMovieInStorage) {
      const newStorageFilm = storagedFilms.map((item: Movie) =>
      movieId === item.id ? {...item, rating: newRating} : item);
      window.localStorage.setItem('rated-films', JSON.stringify(newStorageFilm))
    }
     else {
      const newRateFilm = movies?.find((item) => item.id === movieId)
      if(newRateFilm) {
        newRateFilm.rating = newRating;
        storagedFilms.unshift(newRateFilm);
        window.localStorage.setItem('rated-films', JSON.stringify(storagedFilms))
      }
    }
  }

  const tabChangeHandler = (key: number): void => {
    setNavigate(Number(key))
    if(key === navigate) return;
    if(key === 1) {
      searchMovies(value, currentPage)
      setLoading(false)
    }
    if(key === 2) {
      const filmStorage = window.localStorage.getItem('rated-films');
      if(filmStorage) {
        const maxFilms = JSON.parse(filmStorage || ''); 
        let startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const arrFilmStorage = maxFilms.slice(startIndex, endIndex);      
        setMovies(arrFilmStorage)
        setLoading(false)
        setTotal(arrFilmStorage.length / 20)
        setNavigate(2)
      } else { 
        setMovies([]) 
        setTotal(0)
      }
    }
  }
  
  let contentLoading = isLoading ? (<Spin style={{display: 'flex', justifyContent: 'center', marginTop: '30px' }} />) : (<div>
      <MoviesList 
      movies={movies}
      genres={genres}
      filmRateChange={filmRateChange}
      />
      <Pagination 
      style={{textAlign: 'center'}}
      total={total}
      onChange={(page) => {
        window.localStorage.setItem('page', `${page}`)
        paginationChange(page)}}
      defaultCurrent={1}
      pageSize={pageSize}
      current={currentPage}
      />
  </div>)
  
  return (
    <div>
      <Navigation handleNavigation={tabChangeHandler}/>
      {navigate === 1 ? (
        <Search handleChange={handleChange} />
      ) : null}
      {contentLoading}
    </div>
  );
}