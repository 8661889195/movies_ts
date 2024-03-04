import styled from 'styled-components';

export const StyleMovie = styled.li`
  display: flex;
  list-style: none;
  width: 451px;
  height: 281px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
`
export const StyleImg = styled.img`
  width: 183px;
  height: 281px;
  order: 1;
`

export const StyleContent = styled.div`
  position: relative;
  order: 2;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  justify-content: space-between;
  padding: 15px 20px 20px 20px;
`