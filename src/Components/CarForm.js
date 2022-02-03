import { carList } from "../mock";
import { v4 as uuidv4 } from "uuid";
const CarForm = (props) => {
  const {
    toggle,
    currentCar,
    handleSubmit,
    handleChange,
    handleReset,
    formErrors,
  } = props;

  const blockKeyDown = (e, value) => {
    if (value > 99999 && e.keyCode !== 46 && e.keyCode !== 8) {
      e.preventDefault();
    }
  };
  const visible = toggle ? "form-container" : "hidden";
  return (
    <div className={visible}>
      <form action="" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="brand">Brand</label>
          <select onChange={handleChange} name="brand" id="brand">
            <option value="" disabled selected>
              --Please choose an option--
            </option>
            {carList.map((car) => {
              return (
                <option
                  key={uuidv4()}
                  selected={
                    currentCar
                      ? currentCar.brand === car
                        ? "selected"
                        : false
                      : false
                  }
                  value={car}
                >
                  {car}
                </option>
              );
            })}
          </select>
          <span className="errors">{formErrors.brand}</span>
        </div>
        <div className="input-container">
          <label htmlFor="model">Model</label>
          <input
            value={currentCar.model ? currentCar.model : ""}
            onChange={handleChange}
            type="text"
            id="model"
            maxLength={15}
          />
          <span className="errors">{formErrors.model}</span>
        </div>
        <div className="input-container">
          <label htmlFor="engine">Engine Displacement </label>
          <div className="input-inside">
            <input
              value={currentCar.engine ? currentCar.engine : ""}
              onChange={handleChange}
              onKeyDown={(e) => {
                blockKeyDown(e, currentCar.engine);
              }}
              type="number"
              id="engine"
              max={99999}
            />
            <p className="engine">cm3</p>
          </div>
          <span className="errors">{formErrors.engine}</span>
        </div>
        <div className="input-container">
          <label htmlFor="color">Color</label>
          <input
            value={currentCar.color ? currentCar.color : " "}
            onChange={handleChange}
            type="text"
            id="color"
            maxLength={15}
          />
          <span className="errors">{formErrors.color}</span>
        </div>
        <div className="input-container">
          <label htmlFor="design">Design</label>
          <input
            value={currentCar.design ? currentCar.design : " "}
            onChange={handleChange}
            type="text"
            id="design"
            maxLength={15}
          />
          <span className="errors">{formErrors.design}</span>
        </div>
        <div className="input-container">
          <label htmlFor="date">Date of manufacture</label>
          <input onChange={handleChange} type="date" id="date" />
          <span className="errors">{formErrors.date}</span>
        </div>
        <div className="input-container">
          <label htmlFor="web">Manufacture's website</label>
          <input
            value={currentCar.web ? currentCar.web : " "}
            onChange={handleChange}
            type="text"
            id="web"
            maxLength={30}
            placeholder="https://www.bmw.com/"
          />
          <span className="errors">{formErrors.web}</span>
        </div>
        <div className="button-container">
          <input
            onClick={handleReset}
            type="button"
            className="btn btn-del"
            value="Reset Form"
          ></input>
          <input
            type="submit"
            className="btn btn-submit"
            value="Submit"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
