import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      x: 0,
      y: 0,
      renderBall: false
    };
    this.timerId = null;
  }

  componentDidMount() {
    document.addEventListener("keydown", this.changePosition);
  }

  componentWillUnmount() {}

  changePosition = (event) => {
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

    this.setState({ x: xpos, y: ypos });
    if (this.state.x === 250 && this.state.y === 250) {
      document.removeEventListener("keydown", this.timerId);
    }
  };

  startTimer = () => {
    this.setState({ time: this.time + 1 });
  };

  startGame = () => {
    this.setState({ renderBall: true });
    this.timerId = setInterval(this.startTimer, 1000);
  };

  render() {
    let coordinates = {
      x: `${this.state.x}px`,
      y: `${this.state.y}px`
    };
    return (
      <>
        <div className="heading-timer">{this.state.time}</div>
        <button className="start" onClick={this.startGame()}>
          Start
        </button>
        <div className="ball"></div> {/*style={coordinates}*/}
        <div className="hole"></div>
      </>
    );
  }
}

export default Timer;
