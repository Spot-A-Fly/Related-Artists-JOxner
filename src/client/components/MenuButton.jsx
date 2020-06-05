import React from 'react';
import styled from 'styled-components';


class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.ButtonStyle = '';
    this.updateButton = this.updateButton.bind(this);
  }

  updaterender() {
    if (this.state.hover) {
      this.ButtonStyle = styled.div`
      background-color: rgb(90,90,90);
      `;
    } else {
      this.ButtonStyle = styled.div`
      background-color: rgb(50,50,50);
      `;
    }
  }

  updateButton() {
    const newhover = !this.state.hover;
    this.setState({ hover: newhover });
  }

  render() {
    this.updaterender();
    const { ButtonStyle } = this;
    return (
      <ButtonStyle onMouseEnter={this.updateButton} onMouseLeave={this.updateButton}>{this.props.text}</ButtonStyle>
    );
  }
}

export default MenuButton;
