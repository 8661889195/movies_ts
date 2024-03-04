import { StyleGenre } from './Genre.style';

export const Genre = ({genreName}: {genreName: string}) => {
  return(
    <StyleGenre>{genreName}</StyleGenre>
  )
}