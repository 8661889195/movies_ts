import { StyledImageCarousel } from './RatingNumber.style';

export const RatingNumber = ({evaluation}: {evaluation: number}) => {
  let inputClasses= '';
  if(evaluation >= 0 && evaluation < 5) {
    inputClasses = 'orange';
  }
  if(evaluation >= 5 && evaluation < 7) {
    inputClasses = 'yellow';
  }
  if(evaluation >= 7 ) {
    inputClasses = 'green';
  }
 
  return(
    <div>
    <StyledImageCarousel variant={inputClasses}>
      {evaluation}
    </StyledImageCarousel>
    </div>
  )
}