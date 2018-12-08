import React, { Component } from 'react';
import Search from './Search';
import Stats from './Stats';
import keys from './config';

function createBackSplash(url) {
  const style = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  return style;
}

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      temperature: '',
      humidity: '',
      wind: '',
      url: ''
    };
  }

  _onSubmit(event) {
    event.preventDefault();
    const search = event.target.search.value;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&apikey=${
        keys.OWKey
      }`
    )
      .then(r => r.json())
      .then(object => {
        let newStats = {
          name: object.name,
          temperature: (((object.main.temp - 273.15) * 9) / 5 + 32).toFixed(2),
          humidity: object.main.humidity,
          wind: object.wind.speed
        };
        fetch(
          `https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=${
            keys.USKey
          }`
        )
          .then(r => r.json())
          .then(object => {
            let num = Math.floor(Math.random() * 10);
            console.log(num);
            this.setState({
              name: newStats.name,
              temperature: newStats.temperature,
              humidity: newStats.humidity,
              wind: newStats.wind,
              url: object.results[num].urls.regular
            });
          });
      });
  }

  _onChange(event) {}

  render() {
    if (this.state.temperature === '') {
      return (
        <div
          className='mainBody'
          style={createBackSplash(
            `https://images.unsplash.com/photo-1514477917009-389c76a86b68?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM5NDQyfQ`
          )}
        >
          <h1>Check The Temp</h1>
          <Search
            onSubmit={this._onSubmit.bind(this)}
            onChange={this._onChange.bind(this)}
          />
        </div>
      );
    } else {
      return (
        <div className='mainBody' style={createBackSplash(this.state.url)}>
          <Stats
            name={this.state.name}
            temperature={`${this.state.temperature}°F`}
            humidity={`${this.state.humidity}%`}
            wind={`${this.state.wind} Mph`}
          />
          <Search
            onSubmit={this._onSubmit.bind(this)}
            onChange={this._onChange.bind(this)}
          />
        </div>
      );
    }
  }
}

export default Weather;
