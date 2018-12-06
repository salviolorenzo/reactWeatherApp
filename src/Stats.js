import React from 'react';

function Stats(props) {
  return (
    <div className="stats">
      <h1>{props.name}</h1>
      <ul className="stats-list">
        <li>{props.temperature}</li>
        <li>{props.humidity}</li>
        <li>{props.wind}</li>
      </ul>
    </div>
  );
}

export default Stats;
