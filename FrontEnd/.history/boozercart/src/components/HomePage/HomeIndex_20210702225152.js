import React,{const context = useContext(contextValue)} from "react";
import { BookContext } from "../Context/BookContext";

function HomeIndex() {
  const books = useContext(BookContext);

  return <>Hello world</>;
}

export default HomeIndex;
