import React from 'react';

function Stats(props) {
  return (
    <div className="stats">
      <h1>{props.name}</h1>
      <ul className="stats-list">
        <li>Temperature: {props.temperature}</li>
        <li>Humidity: {props.humidity}</li>
        <li>Wind: {props.wind}</li>
      </ul>
    </div>
  );
}

export default Stats;
