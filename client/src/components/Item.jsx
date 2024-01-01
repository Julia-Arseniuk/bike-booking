// eslint-disable-next-line
import React from "react";
import SelectElement from "./SelectElement";
import { useDispatch } from "react-redux";
import {deleteBike} from '../redux/slice';

const Item = ({bike}) => {
  const dispatch = useDispatch();
  const {name, type, color, price, status, id, _id} = bike;

  let itemStyle = '';
  if (status.value === 'available') itemStyle = 'item';
  else if (status.value === 'busy') itemStyle = 'item busy';
  else if (status.value === 'unavailable') itemStyle = 'item unavailable';

  return (
    <div className={itemStyle}>
      <div className="item-left-block">
        <div className="label-block">
          <span className="name">{name.toUpperCase()}</span> - <span>{type.toUpperCase()}</span>
          <span>({color})</span>
        </div>
        <div className="id-block">
          <span>{`ID: ${id}`}</span>
        </div>
        <div className="status-block">
          <span>STATUS</span>
          <SelectElement bike={bike} />
        </div>
      </div>

      <div className="item-right-block">
        <button className="remove-btn" onClick={() => dispatch(deleteBike({_id}))}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Group">
              <path
                id="Vector"
                d="M9 9L1 1M9 1L1 9"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </button>
        <div className="price-block">
          <span>{price}</span> <span>UAH/hr.</span>
        </div>
      </div>
    </div>
  );
};

export default Item;
