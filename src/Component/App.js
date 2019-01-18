import React, { Component } from 'react';
import axios from 'axios';
import Waste from './Waste';

import {AppDiv, AppHeader, FavouriteDiv, FavouriteListDiv, ResultDiv, SearchDiv, WrapperDiv} from '../Styled/AppStyled';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      waste: [],
      filteredWaste: [],
      favouriteWaste: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleStarPress = this.handleStarPress.bind(this);
  }

  componentDidMount() {
    axios.get(`https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000`)
      .then(res => {
        this.setState({ waste: this.idGenerator(res.data) });
      })
      .catch(err => {
        this.setState.keyword = "Error while loading";
        window.location.reload();
      });
  }

  handleChange = event => {
    if(this.state.keyword.trim() === "") this.setState({filteredWaste: []})
    console.log(this.state.keyword);
    this.setState({[ event.target.name ]: event.target.value});
  }

  handleKeyPress = event => { if(event.key === 'Enter') this.handleSearch(event); }

  handleSearch = () => {
   if(this.state.keyword !== "") {
    this.setState({ filteredWaste : this.state.waste.filter(waste => waste.keywords.match(new RegExp(this.state.keyword, 'g'))) });
   }
  }

  handleStarPress = id => {
    this.setState({ waste : this.state.waste.map(waste => {
      if(waste.id === id) {
        waste.isFavourite = !waste.isFavourite;

        if(waste.isFavourite) this.setState({ favouriteWaste: [...this.state.favouriteWaste, waste.id] })
        else this.setState({ favouriteWaste: this.state.favouriteWaste.filter(favWaste => favWaste !== waste.id) });

      }
      return waste;
    })});
  }

  idGenerator = data => (
    data.map(data => {
      if(!data.id) data.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10) + `_${data.title.replace(/[^a-z]+/g, '').substr(2, 8) }`;
      return data;
    })
  )

  render() {
    const { handleChange, handleKeyPress, handleSearch, handleStarPress } = this;
    const { keyword, waste, favouriteWaste, filteredWaste } = this.state;

    return (
      <AppDiv>
        <AppHeader>
          <span>Toronto Waste Lookup</span>
        </AppHeader>
        <WrapperDiv>
          <SearchDiv>
            <input name="keyword" value={keyword} onChange={handleChange} onKeyPress={handleKeyPress} aria-describedby="keyword input" autoFocus></input>
            <button name="search" onClick={handleSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </button>
          </SearchDiv>
          <ResultDiv>
            {
              filteredWaste.map(waste => <Waste key={waste.id} id={waste.id} title={waste.title} body={waste.body} handler={handleStarPress} isFavourite={waste.isFavourite}/>)
            }
          </ResultDiv>
          {
            favouriteWaste.length?
            <FavouriteDiv>
                <span>Favourites</span>
                <FavouriteListDiv>
                {
                  waste.map(waste => {
                    if(favouriteWaste.some(favWaste => favWaste === waste.id)){
                      return (<Waste key={waste.id} id={waste.id} title={waste.title} body={waste.body} handler={handleStarPress} isFavourite={true}/>)
                    }
                    return null;
                  })
                }
                </FavouriteListDiv>
            </FavouriteDiv>
            : null
          }
        </WrapperDiv>
      </AppDiv>
    );
  }
}

export default App;
