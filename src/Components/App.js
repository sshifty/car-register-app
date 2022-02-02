import "../App.css";
import CarTable from "./CarTable";
import CarForm from "./CarForm";
import { useState} from "react";
import { mockData } from "../mock";

function App() {
  const [cars, setCars] = useState(() => {
    const savedCars = JSON.parse(localStorage.getItem("cars"));  
    return savedCars || mockData;
  });

  //If user skips optional choices, we still need the order for the table display
  const [currentCar, setCurrentCar] = useState({
    brand: "",
    model: "",
    engine: null,
    color: "",
    design: "",
    date: 0,
    web: "",
  });
  const [toggle, setToggle] = useState(false);

  const handleBrand = (e) => {
    setCurrentCar((prevState) => {
      return {
        ...prevState,
        brand: e.target.value,
      };
    });
  };
  const handleModel = (e) => {
    setCurrentCar((prevState) => {
      return {
        ...prevState,
        model: e.target.value,
      };
    });
  };

  const handleEngine = (e) => {
    setCurrentCar((prevState) => {
      return {
        ...prevState,
        engine: e.target.value,
      };
    });
  };

  const handleColor = (e) => {
    setCurrentCar((prevState) => {
      return {
        ...prevState,
        color: e.target.value,
      };
    });
  };

  const handleDesign = (e) => {
    setCurrentCar((prevState) => {
      return {
        ...prevState,
        design: e.target.value,
      };
    });
  };

  const handleDate = (e) => {
    setCurrentCar((prevState) => {
      return {
        ...prevState,
        date: new Date(e.target.value).getTime(),
      };
    });
  };

  const handleWeb = (e) => {
    setCurrentCar((prevState) => {
      return {
        ...prevState,
        web: e.target.value,
      };
    });
  };
  const handleReset = () => {
    setCurrentCar({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(currentCar);
    setCars((prevState) => {
      let tempCars = JSON.parse(JSON.stringify(prevState));
      tempCars.push(currentCar);
      localStorage.setItem("cars", JSON.stringify(tempCars));
      return tempCars;
    });
    setCurrentCar({
      brand: "",
      model: "",
      engine: null,
      color: "",
      design: "",
      date: 0,
      web: "",
    });
  };

  return (
    <div className="App">
      <div className="toggle-container">
        <input onClick={() => setToggle(!toggle)} type="checkbox" id="switch" />
        <label className="toggle-label" htmlFor="switch">
          
        </label>
      </div>
      <CarTable cars={cars} />
      <CarForm
        toggle={toggle}
        handleBrand={handleBrand}
        handleModel={handleModel}
        handleEngine={handleEngine}
        handleColor={handleColor}
        handleDesign={handleDesign}
        handleDate={handleDate}
        handleWeb={handleWeb}
        handleSubmit={handleSubmit}
        currentCar={currentCar}
        handleReset={handleReset}
        setCurrentCar={setCurrentCar}
      />
    </div>
  );
}

export default App;
