import { snacks } from "../Data/snackData";
import { useState } from "react";
import "./SnackCalc.css";

export const SnackCalc = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredSnacks = snacks.filter(
    (snack) =>
      snack.product_name.toLowerCase().includes(searchTerm) ||
      snack.ingredients.join(" ").toLowerCase().includes(searchTerm)
  );

  return (
    <div className="tableSnack">
      <h1>Snack Calculator</h1>
      <input
        type="text"
        placeholder="Search with Products or Ingredients"
        className="searchBar"
        value={searchTerm}
        onChange={handleChange}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Product Weight</th>
            <th>Price</th>
            <th>Calories</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {filteredSnacks.map((snack) => (
            <tr key={snack.id}>
              <td>{snack.id}</td>
              <td>{snack.product_name}</td>
              <td>{snack.product_weight}</td>
              <td>{snack.price}</td>
              <td>{snack.calories}</td>
              <td>{snack.ingredients.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
