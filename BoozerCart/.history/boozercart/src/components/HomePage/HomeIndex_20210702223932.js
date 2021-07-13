import React, { useState } from "react";

export default function HomeIndex() {
  const [values, setValues] = useState([
    { title: "first one", id: 1 },
    { title: "second two", id: 1 },
    { title: "third three", id: 1 },
  ]);

  const [books]

  return (
    <>
      <div>
        <h2> this is home</h2>
        <ul>
          {values.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
