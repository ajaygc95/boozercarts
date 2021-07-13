import React from "react";

function Register() {
  return (
    <>
      <RegisterUserContainer classname="register-container">
        <ContainerWrapper onSubmit={handleSubmit}>
          <h1>
            Username:
            <input
              name="username"
              type="username"
              //   value={values.username}
              //   onChange={handleChange}
            ></input>
          </h1>
          <h1>
            Password:
            <input
              name="password"
              type="password"
              //   value={values.password}
              //   onChange={handleChange}
            ></input>
          </h1>
          <button>Submit</button>
        </ContainerWrapper>
      </RegisterUserContainer>
    </>
  );
}

export default Register;
