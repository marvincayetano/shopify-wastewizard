import styled from 'styled-components';
import { color, font } from './Colors';

const AppDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(min-content, 100px) auto auto;
  text-align: center;
`;

const AppHeader = styled.header`
  display: grid;
  align-items: center;
  background-image: linear-gradient(to right, ${color.BLUE}, ${color.GREEN});
  > span {
    color: ${font.WHITE};
    font-size: 2em;
    font-weight: 700;
  }
`;

const FavouriteDiv = styled.div`
  background-color: ${color.LIGHTGREEN};
  display: grid;
  padding: 20px 0 15px 0;
  > span {
    color: ${color.DARKGREEN};
    font-size: 1.8em;
    font-weight: 700;
    justify-self: start;
  }
`;

const FavouriteListDiv = styled.div`
  display: grid;
  grid-auto-flow: row;
`;

const ResultDiv = styled.div`
  display: grid;
  grid-auto-flow: row;
`;

const SearchDiv = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: minmax(min-content, 1fr) 50px;
  grid-template-rows: minmax(min-content, 50px);
  > input {
    border: 1px solid ${color.GRAY};
    border-radius: 2px;
    padding: 10px;
    font-size: 1.5rem;
    color: ${color.DARKGRAY};
  }
  >button {
    background-color: ${color.GREEN};
    border-radius: 2px;
    box-shadow: 0 2px 2px 0 rgba(169, 169, 169, .14), 0 3px 1px -2px rgba(169, 169, 169, .2), 0 1px 5px 0 rgba(169, 169, 169, .12);
  }
`;

const WrapperDiv = styled.div`
  margin: 20px;
`;


export {
  AppDiv,
  AppHeader,
  FavouriteDiv,
  FavouriteListDiv,
  ResultDiv,
  SearchDiv,
  WrapperDiv,
}