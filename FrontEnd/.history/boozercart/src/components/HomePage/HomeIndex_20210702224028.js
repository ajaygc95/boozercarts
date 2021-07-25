import React, { useState, useContext } from "react";
import { BookContext } from "../Context/BookContext";

export default function HomeIndex() {
  const [values, setValues] = useState([
    { title: "first one", id: 1 },
    { title: "second two", id: 1 },
    { title: "third three", id: 1 },
  ]);

  const { books } = useContext(BookContext);

  return (
    <>
      <div>
        <h2> this is home</h2>
        <ul>
          {books.map(item)}
        </ul>
      </div>
    </>
  );
}
