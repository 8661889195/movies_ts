import styled from 'styled-components';

export const StyledImageCarousel = styled.div<{variant: string}>`
border: ${props => props.variant === 'orange' ? '2px solid #E97E00' : props.variant ==='yellow' ? '2px solid #E9D100' : props.variant ==='green' ? '2px solid #66E900' : 'none'};
position: absolute;
right: 20px;
top: 15px;
background-color: transparent;
border-radius: 50%;
width: 30px;
height: 30px;
font-size: 12px;
align-items: center;
justify-content: center;
display: flex;
font-family: 'Roboto', sans-serif;
`
// export const RateOrange = styled.div`
//   border: 2px solid #E97E00;
// `

// export const RateYellow = styled.div`
//   border: 2px solid #E9D100;
// `

// export const RateGreen = styled.div`
//   border: 2px solid #66E900;
// `