import React, {useEffect} from 'react'

import { useDispatch, useSelector } from "react-redux";
import {getAllBikes} from '../../redux/slice';

import Item from '../Item';
import Form from '../Form';
import Stats from '../Stats';

const Main = () => {

  const dispatch = useDispatch();
  const bikes = useSelector((state) => state.bikeState.bikes);

  useEffect(() => {
    dispatch(getAllBikes());
    // eslint-disable-next-line
  }, [])

  return (
 <div className="main">
    <div className="left-side">
      {bikes.map((bike, i) => (
        <Item key={i} bike={bike} />
      ))}
        
    </div>

    <div className="right-side">
        <Form />
        <Stats />
    </div>
 </div>

  )
}

export default Main;