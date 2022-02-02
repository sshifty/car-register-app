import { carList } from "../mock";
import { v4 as uuidv4 } from "uuid";
const CarForm = (props) => {
  const {
    toggle,
    currentCar,
    handleSubmit,
    handleBrand,
    handleModel,
    handleEngine,
    handleColor,
    handleDesign,
    handleDate,
    handleWeb,
    handleReset,
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
          <select onChange={handleBrand} name="brand" id="brand" required>
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
        </div>
        <div className="input-container">
          <label htmlFor="model">Model</label>
          <input
            value={currentCar.model ? currentCar.model : ""}
            onChange={handleModel}
            type="text"
            id="model"
            required
            maxLength={15}
          />
        </div>
        <div className="input-container">
          <label htmlFor="engine">Engine Displacement </label>
          <div className="input-inside">
            <input
              value={currentCar.engine ? currentCar.engine : ""}
              onChange={handleEngine}
              onKeyDown={(e) => {
                blockKeyDown(e, currentCar.engine);
              }}
              type="number"
              id="engine"
              required
              max={99999}
            />
            <p className="engine">cm3</p>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="color">Color</label>
          <input
            value={currentCar.color ? currentCar.color : " "}
            onChange={handleColor}
            type="text"
            id="color"
            maxLength={15}
          />
        </div>
        <div className="input-container">
          <label htmlFor="design">Design</label>
          <input
            value={currentCar.design ? currentCar.design : " "}
            onChange={handleDesign}
            type="text"
            id="design"
            required
            maxLength={15}
          />
        </div>
        <div className="input-container">
          <label htmlFor="date">Date of manufacture</label>
          <input onChange={handleDate} type="date" id="date" required />
        </div>
        <div className="input-container">
          <label htmlFor="website">Manufacture's website</label>
          <input
            value={currentCar.web ? currentCar.web : " "}
            onChange={handleWeb}
            type="url"
            id="website"
            maxLength={30}
            placeholder="https://www.bmw.com/"
          />
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
