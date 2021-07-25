import React, { useState } from "react";
import { RegisterUserContainer, ContainerWrapper } from "./Register.element";

function Register() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      <RegisterUserContainer classname="register-container">
        <ContainerWrapper>
          <h1>
            Username:
            <input
              name="username"
              type="username"
              value={values.username}
              //   onChange={handleChange}
            ></input>
          </h1>
          <h1>
            Password:
            <input
              name="password"
              type="password"
              value={values.password}
                onChange={handleChange}
            ></input>
          </h1>
          <button>Submit</button>
        </ContainerWrapper>
      </RegisterUserContainer>
    </>
  );
}

export default Register;
