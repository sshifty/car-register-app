import "../App.css";
import CarTable from "./CarTable";
import CarForm from "./CarForm";
import { useState, useEffect } from "react";
import { mockData } from "../mock";

function App() {
  const [cars, setCars] = useState(() => {
    const savedCars = JSON.parse(localStorage.getItem("cars"));
    return savedCars || mockData;
  });

  const emptyValues = {
    brand: "",
    model: "",
    engine: null,
    color: "",
    design: "",
    date: 0,
    web: "",
  };
  //If user skips optional choices, we still need the order for the table display
  const [currentCar, setCurrentCar] = useState(emptyValues);
  const [toggle, setToggle] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (e.target.id === "date") {
      setCurrentCar((prevState) => {
        return {
          ...prevState,
          [id]: new Date(e.target.value).getTime(),
        };
      });
    } else {
      setCurrentCar((prevState) => {
        return {
          ...prevState,
          [id]: value,
        };
      });
    }
  };
  const handleReset = () => {
    setCurrentCar(emptyValues);
    setIsSubmit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(currentCar));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      setCars((prevState) => {
        let tempCars = JSON.parse(JSON.stringify(prevState));
        tempCars.push(currentCar);
        localStorage.setItem("cars", JSON.stringify(tempCars));
        return tempCars;
      });
      setCurrentCar(emptyValues);
      setFormErrors({});
      setTimeout(() => {
        setIsSubmit(false);
      }, 2000);
    }
  };

  const validateForm = (values) => {
    const regexp = /^[a-zA-Z ]*$/;
    const numberRegexp = /^[0-9]{1,5}$/;
    const urlRegexp =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    const errors = {};
    if (!values.brand) {
      errors.brand = "Brand is required!";
    }
    if (!values.model) {
      errors.model = "Model is required!";
    }
    if (!values.engine) {
      errors.engine = "Engine displacement is required!";
    } else if (!numberRegexp.test(values.engine)) {
      errors.engine = "Engine displacement must be between 0-99999";
    }

    if (!values.date) {
      errors.date = "Date of Manufacture is required!";
    } else if (values.date > Date.now()) {
      errors.date = "Date cannot be in the future";
    }
    if (!regexp.test(values.color)) {
      errors.color = "Cannot contain non-alphabetic characters";
    }
    if (!regexp.test(values.design)) {
      errors.design = "Cannot contain non-alphabetic characters";
    }

    if (values.web && !urlRegexp.test(values.web)) {
      errors.web = "Website must be a valid format";
    }

    return errors;
  };
  return (
    <div className="App">
      <div className="toggle-container">
        <input onClick={() => setToggle(!toggle)} type="checkbox" id="switch" />
        <label className="toggle-label" htmlFor="switch"></label>
      </div>
      <CarTable cars={cars} />
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="success">Car added to table</div>
      ) : null}
      <CarForm
        toggle={toggle}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        currentCar={currentCar}
        handleReset={handleReset}
        setCurrentCar={setCurrentCar}
        formErrors={formErrors}
      />
    </div>
  );
}

export default App;
