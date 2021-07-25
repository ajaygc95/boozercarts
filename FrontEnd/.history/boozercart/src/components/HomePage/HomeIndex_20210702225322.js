import React, { useContext } from "react";
import { BookContext } from "../Context/BookContext";

function HomeIndex() {
  const { books } = useContext(BookContext);

  return (
    <>
      {books.map((book) => {
        <li>{books.title}</li>;
      })}
    </>
  );
}

export default HomeIndex;
