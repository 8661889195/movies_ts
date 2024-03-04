import {Request} from './types';

export class MovieDBService {

  _apiKey = "e0ac4ef20aac59a9e50d45b2d6ffb2c5";

  _apiBase = "https://api.themoviedb.org/3/";

  async getResource(url: string) {
    const res = await fetch(url)

    if( !res.ok ) {
      throw new Error('new error')
    }

    const body = await res.json()
    return body;
  }

  getAllMovie = async(query: string, page: number): Promise<Request> => {    
    const res = await this.getResource(`${this._apiBase}search/movie?api_key=${this._apiKey}&query=${query}&include_adult=false&language=en-US&page=${page}`)
    return res;
  }

  getGenresList = async() => {
    const res = await this.getResource(`${this._apiBase}genre/movie/list?api_key=${this._apiKey}&language=en`);
    return res;
  }
}