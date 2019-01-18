import styled from 'styled-components';
import { color } from './Colors';

const WasteDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, 30px) 2fr 4fr minmax(0, 15px);
  margin: 20px 0 15px 0;
  font-size: 1.2rem;
  color: ${color.darkgray};
  text-align: left;
  > span ul {
    margin: 0;
  }
  > span ul li {
    margin-bottom: 20px;
  }
`;

const StarSvg = styled.svg`
  fill: ${props => props.isFavourite? '#22985E' : '#aaa'};

  &:hover {
    fill: ${color.green};
    cursor: pointer;
  }
`;

export {
  WasteDiv,
  StarSvg,
}