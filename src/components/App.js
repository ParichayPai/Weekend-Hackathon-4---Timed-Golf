import React, { Component, useState } from "react";
import "../styles/App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      x: 0,
      y: 0,
      renderBall: false
    };
    this.timerId = null;
    this.changePosition = this.changePosition.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.changePosition);
  }

  componentWillUnmount() {}

  changePosition(event) {
    if (!this.state.renderBall) return;

    let xpos = this.state.x;
    let ypos = this.state.y;

    if (event.keyCode === 37) {
      xpos -= 5;
    } else if (event.keyCode === 38) {
      ypos -= 5;
    } else if (event.keyCode === 39) {
      xpos += 5;
    } else if (event.keyCode === 40) {
      ypos += 5;
    }

    this.setState({ x: xpos, y: ypos }, () => {
      if (xpos === 250 && ypos === 250) {
        clearInterval(this.timerId);
        document.removeEventListener("keydown", this.changePosition);
      }
    });
  }

  startTimer() {
    this.setState({ time: this.state.time + 1 });
  }

  startGame() {
    this.setState({ renderBall: true });
    this.timerId = setInterval(this.startTimer, 1000);
  }

  render() {
    let coordinates = {
      left: `${this.state.x}px`,
      top: `${this.state.y}px`
    };
    return (
      <>
        <div className="heading-timer">{this.state.time}</div>
        <button className="start" onClick={this.startGame}>
          Start
        </button>
        <div className="ball" style={coordinates}></div>
        <div className="hole"></div>
      </>
    );
  }
}

export default App;
