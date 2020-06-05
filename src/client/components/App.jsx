import React from 'react';
import styled from 'styled-components';

import ArtistList from './ArtistList.jsx';
import ArtistMenu from './ArtistMenu.jsx';


// const widthandheight = (windowsize) => {
//   let size;
//   const { width } = windowsize;
//   if (width < 767) {
//     size = { width: '33%', height: '33%' };
//   } else if (width >= 767 && width < 996) {
//     size = { width: '25%', height: '25%' };
//   } else if (width >= 996 && width < 1200) {
//     size = { width: '16%', height: '16%' };
//   } else {
//     size = { width: '10%', height: '10%' };
//   }
//   return size;
// };

const AppStyle = styled.div`
  min-height: 100%;
  background-color: rgb(30,30,30);
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistid: '1',
      artistinfo: {},
      showmenu: false,
      menuposition: { top: 0, left: 0 },
    };
    this.fetchArtistData = this.fetchArtistData.bind(this);
    this.handlerightclick = this.handlerightclick.bind(this);
  }

  componentDidMount() {
    this.fetchArtistData();
    window.addEventListener('resize', this.updatewindow);
    document.addEventListener('contextmenu', this.handlerightclick);
    const context = this;
    window.onhashchange = () => {
      context.forceUpdate();
    };
  }

  handlerightclick(event) {
    event.preventDefault();
    const classtype = event.target.alt;
    if (classtype === 'related artist') {
      this.setState({ showmenu: true });
      const newpos = { left: event.pageX + 10, top: event.pageY + 10 };
      this.setState({ menuposition: newpos });
    } else {
      this.setState({ showmenu: false });
    }
  }

  handleclick() {
    return this.state;
  }

  fetchArtistData() {
    // need to find an initial artist.
    fetch(`/data/artist?artistId=${this.state.artistid}`).then((response) => {
      return response.json();
    }).then((data) => {
      // console.log(data.relatedArtists[0]);
      let param = {};
      if (data !== null) {
        param = data.artist;
      }
      this.setState({ artistinfo: param });
    });
  }


  render() {
    let component;
    if (Object.keys(this.state.artistinfo).length === 0) {
      component = <div>empty</div>;
    } else {
      component = <ArtistList artist={this.state.artistinfo} rightclick={this.handlerightclick} />;
    }
    let menu;
    if (this.state.showmenu) {
      menu = <ArtistMenu pos={this.state.menuposition} />;
    } else {
      menu = <div />;
    }
    if (window.location.hash === '#related') {
      return (
        <AppStyle>
          {menu}
          {component}
        </AppStyle>
      );
    }
    return (
      <div />
    );
  }
}
export default App;
