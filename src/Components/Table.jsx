import React, { useEffect, useState } from "react";
import { snacks } from "../db/snacks";

const Table = () => {
  const [filteredSnacks, setFilteredSnacks] = useState(snacks);
  const [inputValue, setInputValue] = useState("");

  const handleSearchSnack = (e) => {
    setInputValue(e.target.value);
    const newFilteredSnacks = snacks.filter(
      (item) =>
        item.product_name.includes(inputValue) ||
        String(item.ingredients).includes(inputValue)
    );
    if (inputValue.length === 0) {
      setFilteredSnacks(snacks);
    } else {
      setFilteredSnacks(newFilteredSnacks);
    }
  };

  const handleSortSnacks = (key, type = "string") => {
    console.log(key, type);
    if (type === "string") {
      const sortedSnacks = snacks.sort((s1, s2) =>
        s1[key] > s2[key] ? 1 : s1[key] < s2[key] ? -1 : 0
      );
      console.log(sortedSnacks);
      setFilteredSnacks(sortedSnacks);
    }
  };

  console.log(filteredSnacks);

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={handleSearchSnack}
          placeholder="Search products or ingredients"
          value={inputValue}
        />
      </div>
      <table>
        <tr>
          <td>ID</td>
          <td>
            Product Name{" "}
            <button onClick={() => handleSortSnacks("product_name", "string")}>
              Click
            </button>
          </td>
          <td>Product Weight</td>
          <td>Price (INR)</td>
          <td>Calories</td>
          <td>Ingredients</td>
        </tr>
        {filteredSnacks.map((snack) => (
          <tr>
            <td>{snack.id}</td>
            <td>{snack.product_name}</td>
            <td>{snack.product_weight}</td>
            <td>{snack.price}</td>
            <td>{snack.calories}</td>
            <td>{snack.ingredients.map((item) => `${item},`)}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Table;
