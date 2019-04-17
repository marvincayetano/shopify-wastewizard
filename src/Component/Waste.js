import React from 'react';
import propTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { WasteDiv, StarSvg } from '../Styled/WasteStyled';

function decodeHTML(input) {
    const res = document.createElement('span'); //eslint-disable-line
    res.innerHTML = input;
    return res.childNodes.length === 0 ? '' : res.childNodes[0].nodeValue;
}

export default function Waste({
    id, handler, isFavourite, title, body
}) {
    return (
        <WasteDiv>
            <StarSvg onClick={() => handler(id, title)} isFavourite={isFavourite} xmlns="http://www.w3.org/2000/svg" width="46" height="36" viewBox="0 0 24 24">
                <path d="M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z" /><path fill="none" d="M0 0h18v18H0z" />
            </StarSvg>

            <span>{title}</span>
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decodeHTML(body)) }} /> {/*eslint-disable-line*/}
        </WasteDiv>
    );
}

Waste.propTypes = {
    id: propTypes.string.isRequired,
    handler: propTypes.func.isRequired,
    isFavourite: propTypes.bool,
    title: propTypes.string.isRequired,
    body: propTypes.string.isRequired
};

Waste.defaultProps = {
    isFavourite: false
};
