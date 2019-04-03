import React from 'react';
import styled from 'styled-components';
import Artist from './Artist.jsx';
import { thisTypeAnnotation } from '@babel/types';

const getRelatedArtist = (id) => {
  return fetch(`http://localhost:3000/data/artist?id=${id}`).then((response) => {
    return response.json();
  });
};

class ArtistList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
    };
    this.List = '';
    this.Icon = '';
  }


  componentDidMount() {
    const newstate = [];

    this.props.artist.relatedartists.forEach((relatedartist) => {
      getRelatedArtist(relatedartist).then((artistdata) => {
        const component = artistdata;
        newstate.push(component);
        this.setState({ artists: newstate });
      });
    });
  }

  updatesize() {
    this.List = styled.div`
      width: ${window.innerWidth};
      height: ${window.innerWidth};
      min-width: 400px;
      max-width: 1440px;
      min-height: 400px;
      max-height: 1440px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
      background-color: black
    `;
    this.Icon = styled.div`
      background-color: black;
      color: white;
      padding: 32px;
      width: ${this.props.size.width};
      height: ${this.props.size.height};
      letter-spacing: .015em;
    `;
  }

  render() {
    if (this.state.artists.length === 0) {
      return <div>loading artists</div>;
    }
    this.updatesize();
    const { Icon, List } = this;
    return (
      <List>
        {this.state.artists.map((artistdata) => {
          const { _id } = artistdata;
          return <Icon key={_id}><Artist artist={artistdata} /></Icon>;
        })}
      </List>
    );
  }
}


export default ArtistList;
