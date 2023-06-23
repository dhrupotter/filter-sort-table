import React, { useEffect, useState } from "react";
import { snacks } from "../db/snacks";

const Table = () => {
  const initToggleSortOrder = Object.keys(snacks[0]).reduce((acc, curr) => {
    return { ...acc, [curr]: false };
  }, {});

  const [sortedSnacks, setSortedSnacks] = useState(snacks);
  const [filteredSnacks, setFilteredSnacks] = useState(snacks);
  const [inputValue, setInputValue] = useState("");
  const [toggleSortOrder, setToggleSortOrder] = useState(initToggleSortOrder);

  const handleSearchSnack = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const newFilteredSnacks = sortedSnacks.filter(
      (item) =>
        item.product_name.includes(inputValue) ||
        String(item.ingredients).includes(inputValue)
    );
    if (inputValue.length === 0) {
      setFilteredSnacks(sortedSnacks);
    } else {
      setFilteredSnacks(newFilteredSnacks);
    }
  }, [inputValue, sortedSnacks]);

  const handleSortSnacks = (key, type = "string") => {
    if (type === "string") {
      let sortedSnacks;
      if (toggleSortOrder[key]) {
        sortedSnacks = snacks.sort((a, b) => (a[key] > b[key] ? 1 : -1));
        console.log(sortedSnacks);
      } else {
        sortedSnacks = snacks.sort((a, b) => (a[key] > b[key] ? -1 : 1));
      }
      setSortedSnacks([...sortedSnacks]);
    } else if (type === "number") {
      let sortedSnacks;
      if (toggleSortOrder[key]) {
        sortedSnacks = snacks.sort((a, b) => (a[key] > b[key] ? 1 : -1));
        console.log(sortedSnacks);
      } else {
        sortedSnacks = snacks.sort((a, b) => (a[key] > b[key] ? -1 : 1));
      }
      setSortedSnacks([...sortedSnacks]);
    }
    setToggleSortOrder({ ...toggleSortOrder, [key]: !toggleSortOrder[key] });
  };

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
          <td onClick={() => handleSortSnacks("id", "number")}>ID</td>
          <td onClick={() => handleSortSnacks("product_name", "string")}>
            Product Name
          </td>
          <td onClick={() => handleSortSnacks("product_weight", "number")}>
            Product Weight
          </td>
          <td onClick={() => handleSortSnacks("price", "number")}>
            Price (INR)
          </td>
          <td onClick={() => handleSortSnacks("calories", "number")}>
            Calories
          </td>
          <td onClick={() => handleSortSnacks("ingredients", "string")}>
            Ingredients
          </td>
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
