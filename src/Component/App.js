import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Waste from './Waste';

import {
    AppDiv, AppHeader, FavouriteDiv, FavouriteListDiv, ResultDiv, SearchDiv, WrapperDiv
} from '../Styled/AppStyled';

function idGenerator(data) {
    return data.map((x) => {
        if (!x.id) x.id = `${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)}_${x.title.replace(/[^a-z]+/g, '').substr(2, 8)}`;
        return x;
    });
}

const URL = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';
export default function App() {
    const [keyword, setKeyword] = useState('');
    const [waste, setWaste] = useState([]);
    useEffect(() => {
        axios.get(URL)
            .then((res) => {
                setWaste(idGenerator(res.data));
            })
            .catch((err) => {
                setKeyword('Error while loading the data');
            });
    }, []);

    const [filteredWaste, setFilteredWaste] = useState([]);
    const [favouriteWaste, setFavouriteWaste] = useState([]);

    const handleSearch = () => {
        if (keyword.trim() !== '') setFilteredWaste(waste.filter(x => x.keywords.match(keyword, 'g')));
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') handleSearch(event);
    };


    const handleStarPress = (id) => {
        setWaste(
            waste.map((x) => {
                if (x.id === id) {
                    x.isFavourite = !x.isFavourite;

                    if (x.isFavourite) setFavouriteWaste([...favouriteWaste, x.id]);
                    else setFavouriteWaste(favouriteWaste.filter(y => y !== x.id));
                }

                return x;
            })
        );
    };


    return (
        <AppDiv>
            <AppHeader>
                <span>Toronto Waste Lookup</span>
            </AppHeader>
            <WrapperDiv>
                <SearchDiv>
                    <input name="keyword" value={keyword} onChange={(e) => { setKeyword(e.target.value); }} onKeyPress={handleKeyPress} aria-describedby="keyword input" />
                    <button type="button" name="search" onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                    </button>
                </SearchDiv>
                <ResultDiv>
                    {
                        filteredWaste.map(x => <Waste key={x.id} id={x.id} title={x.title} body={x.body} handler={handleStarPress} isFavourite={x.isFavourite} />)
                    }
                </ResultDiv>
            </WrapperDiv>
            {
                favouriteWaste.length
                    ? (
                        <FavouriteDiv>
                            <span>Favourites</span>
                            <FavouriteListDiv>
                                {
                                    waste.map((x) => {
                                        if (favouriteWaste.some(favWaste => favWaste === x.id)) {
                                            return (<Waste key={x.id} id={x.id} title={x.title} body={x.body} handler={handleStarPress} isFavourite />);
                                        }
                                        return null;
                                    })
                                }
                            </FavouriteListDiv>
                        </FavouriteDiv>
                    )
                    : null
            }
        </AppDiv>
    );
}
