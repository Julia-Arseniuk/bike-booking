import React, { useState, useRef } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { updateBike } from "../redux/slice";

const SelectElement = ({ bike }) => {
  const { _id, status } = bike;

  const dispatch = useDispatch();

  const [selectedStatus, setSelectedStatus] = useState(status);

  const options = [
    { value: "available", label: "Available" },
    { value: "busy", label: "Busy" },
    { value: "unavailable", label: "Unavailable" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "transparent",
      border: 0,
      cursor: "pointer",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "transparent",
    }),
  };

  const selectRef = useRef(null);

  const onChange = () => {
    setSelectedStatus();
    const newStatus = selectRef.current.state.focusedOption;
    const data = { _id, status: newStatus };
    dispatch(updateBike(data));
  };

  return (
    <div>
      <Select
        ref={selectRef}
        styles={customStyles}
        placeholder={selectedStatus}
        defaultValue={selectedStatus}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export default SelectElement;
