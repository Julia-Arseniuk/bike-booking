import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBike } from "../redux/slice";
import idGen from "../utils/idGen";

const Form = () => {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const bikes = useSelector((state) => state.bikeState.bikes);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    color: '',
    wheelSize: '',
    price: '',
    description: ''
  });

  const id = idGen(bikes);

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(formRef.current));

    dispatch(addBike(formData));
    setFormData({
      name: '',
      type: '',
      color: '',
      wheelSize: '',
      price: '',
      description: ''
      })
  };

  const clearForm = () => {
    setFormData({
      name: '',
      type: '',
      color: '',
      wheelSize: '',
      price: '',
      description: ''
      })
  }

  return (
    <div className="form-block">
      <form onSubmit={onSubmit} ref={formRef}>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Name"
          minLength={5}
          value={formData.name}
          onChange={onChange}
          required
        />
        <input
          type="text"
          className="form-control"
          name="type"
          placeholder="Type"
          minLength={5}
          value={formData.type}
          onChange={onChange}
          required
        />
        <input
          type="text"
          className="form-control"
          name="color"
          placeholder="Color"
          minLength={5}
          value={formData.color}
          onChange={onChange}
          required
        />
        <input
          type="number"
          className="form-control"
          name="wheelSize"
          placeholder="Wheel size"
          value={formData.wheelSize}
          onChange={onChange}
          required
        />
        <input
          type="number"
          className="form-control"
          name="price"
          step={0.01}
          placeholder="Price"
          value={formData.price}
          onChange={onChange}
          required
        />
        <input
          type="text"
          className="form-control"
          name="id"
          placeholder="ID: Bike-0001"
          value={id}
          onChange={() => {
            idGen(bikes);
          }}
          required
        />
        <textarea
          className="form-control"
          name="description"
          id=""
          cols="30"
          rows="5"
          placeholder="Description"
          minLength={5}
          value={formData.description}
          onChange={onChange}
          required
        ></textarea>
        <button type="submit">Save</button>
        <button type="reset" onClick={clearForm}>Clear</button>
      </form>
    </div>
  );
};

export default Form;
