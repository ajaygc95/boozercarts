import React, { createContext, useState } from "react";

export const BookContext = createContext();

const BookContextProvider = (props) => {
const [books, setBooks] = useState([
    {title:"name of the world", id=1},
    {title:"nsaame of the world", id=2},
    {title:"3 of the world", id=3},
    {title:"na4me of the world", id=4},
    {title:"5 of the world", id=5},
])
    return(
        <BookContextProvider
    )
};
