import moment from "moment";
import { v4 as uuidv4 } from "uuid";
const CarTable = (props) => {
  const { cars } = props;
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Engine Displacement</th>
            <th>Color</th>
            <th>Design</th>
            <th>Date of manufacture</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => {
            return (
              <tr key={uuidv4()}>
                {Object.keys(car).map((key) => {
                  if (key === "engine") {
                    return <td key={uuidv4()}>{car[key]} cm3</td>;
                  } else if (key === "date") {
                    return (
                      <td key={uuidv4()}>
                        {moment(car[key]).format("YYYY.MM.DD.")}
                      </td>
                    );
                  }
                  return <td key={uuidv4()}>{car[key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;
