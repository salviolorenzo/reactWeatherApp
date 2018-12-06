import React, { Component } from 'react';
import Search from './Search';
import Stats from './Stats';
import OWKey from './config';
// import USKey from './config';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      temperature: '',
      humidity: '',
      wind: ''
    };
  }

  _onSubmit(event) {
    event.preventDefault();
    const search = event.target.search.value;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&apikey=${OWKey}`
    )
      .then(r => r.json())
      .then(object => {
        let newStats = {
          name: object.name,
          temperature: (((object.main.temp - 273.15) * 9) / 5 + 32).toFixed(2),
          humidity: object.main.humidity,
          wind: object.wind.speed
        };
        this.setState(newStats);
      });
  }

  render() {
    if (this.state.temperature === '') {
      return (
        <Search
          onSubmit={this._onSubmit.bind(this)}
          onChange={event => {
            console.log(event);
          }}
        />
      );
    } else {
      return (
        <div>
          <Search
            onSubmit={this._onSubmit.bind(this)}
            onChange={event => {
              console.log(event);
            }}
          />
          <Stats
            name={this.state.name}
            temperature={`${this.state.temperature}°F`}
            humidity={`${this.state.humidity}%`}
            wind={this.state.wind}
          />
        </div>
      );
    }
  }
}

export default Weather;
