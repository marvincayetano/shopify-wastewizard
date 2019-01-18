import React, { Component } from 'react';
import { WasteDiv, StarSvg } from '../Styled/WasteStyled';

class Waste extends Component {
  decodeHtml = input => {
    var res = document.createElement('span');
    res.innerHTML = input;
    return res.childNodes.length === 0 ? "" : res.childNodes[0].nodeValue;
  }

  render() {
    const { id, handler, isFavourite, title, body } = this.props;

    return (
      <WasteDiv>
        <StarSvg onClick={() => handler(id, title)} isFavourite={isFavourite} xmlns="http://www.w3.org/2000/svg" width="46" height="36" viewBox="0 0 24 24">
          <path d="M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z"/><path fill="none" d="M0 0h18v18H0z"/>
        </StarSvg >

        <span>{title}</span>
        <span dangerouslySetInnerHTML={{__html: this.decodeHtml(body)}}></span>
      </WasteDiv>
    );
  }
}

export default Waste;
