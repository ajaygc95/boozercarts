import React, { useState } from "react";
import {
  RegisterUserContainer,
  ContainerWrapper,
} from "./../Register/Register.element";
import axios from "axios";
function Login() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values.username, values.password);
    axios.post("http://localhost:8000/auth/", values).then((response) => {
      console.log("this is auth res", response);
    }).then()
    .catch(error=>{console.log});
  };

  return (
    <>
      <RegisterUserContainer classname="register-container">
        <ContainerWrapper onSubmit={handleSubmit}>
          <h1>
            Username:
            <input
              name="username"
              type="username"
              value={values.username}
              onChange={handleChange}
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

export default Login;
