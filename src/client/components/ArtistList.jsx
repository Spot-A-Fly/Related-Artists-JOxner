import React from 'react';
import styled from 'styled-components';
import Artist from './Artist.jsx';


const getRelatedArtist = (id) => {
  return fetch(`/data/artist/related?artistId=${id}`).then((response) => {
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
    // const newstate = [];

    getRelatedArtist(1)
      .then((data) => this.setState({ artists: data.artist }))
      .catch((err) => console.log(err));

    // this.props.artist.relatedArtists.forEach((relatedartist) => {
    //   getRelatedArtist(relatedartist).then((artistdata) => {
    //     const component = artistdata;
    //     newstate.push(component);
    //     this.setState({ artists: newstate });
    //   });
    // });
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
    `;
    this.Icon = styled.div`
      color: white;
      padding: 32px;
      width: 100%;
      height: 100%;
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
          return <Icon key={_id} onContextMenu={this.props.rightclick}><Artist artist={artistdata} /></Icon>;
        })}
      </List>
    );
  }
}


export default ArtistList;
