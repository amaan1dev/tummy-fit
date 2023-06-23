import { snacks } from "../Data/snackData";
import { useState } from "react";
import "./SnackCalc.css";

export const SnackCalc = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleHeaderClick = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredSnacks = snacks.filter(
    (snack) =>
      snack.product_name.toLowerCase().includes(searchTerm) ||
      snack.ingredients.join(" ").toLowerCase().includes(searchTerm)
  );

  const sortedSnacks = filteredSnacks.sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];

    if (columnA < columnB) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

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
            <th onClick={() => handleHeaderClick("id")}>
              ID {sortColumn === "id" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
            </th>
            <th onClick={() => handleHeaderClick("product_name")}>
              Product Name {sortColumn === "product_name" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
            </th>
            <th onClick={() => handleHeaderClick("product_weight")}>
              Product Weight {sortColumn === "product_weight" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
            </th>
            <th onClick={() => handleHeaderClick("price")}>
              Price {sortColumn === "price" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
            </th>
            <th onClick={() => handleHeaderClick("calories")}>
              Calories {sortColumn === "calories" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
            </th>
            <th onClick={() => handleHeaderClick("ingredients")}>
              Ingredients {sortColumn === "ingredients" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSnacks.map((snack) => (
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
