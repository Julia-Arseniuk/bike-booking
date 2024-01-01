import React from "react";
import { useSelector } from "react-redux";

const Stats = () => {
  const bikes = useSelector((state) => state.bikeState.bikes);

  const total = bikes.length;
  const available = bikes.filter(el => el.status.value === 'available').length;
  const booked = bikes.filter(el => el.status.value === 'busy').length;
  
  const averagePrice = bikes.reduce((accumulator, currentValue) => accumulator + +currentValue.price, 0) /  bikes.length;

  return (
    <div className="statistics-block">
      <h3>Statistics</h3>
      <div className="stats-key">
        <span>Total Bikes: </span>
        <span className="stats-value">{total}</span>
      </div>
      <div className="stats-key">
        <span>Available Bikes: </span>
        <span className="stats-value">{available}</span>
      </div>
      <div className="stats-key">
        <span>Booked Bikes: </span>
        <span className="stats-value">{booked}</span>
      </div>
      <div className="stats-key">
        <span>Average bike cost: </span>
        <span className="stats-value">{`${averagePrice.toFixed(2)} `}</span>
        <span>UAH/hr.</span>
      </div>
    </div>
  );
};

export default Stats;
