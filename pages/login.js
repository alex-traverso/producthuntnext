import Router from "next/router";
import React, { useState } from "react";
import Layout from "../components/layout/Layout";

import firebase from "../firebase";

// validaciones
import useValidation from "../hooks/useValidation";
import validateLogIn from "../validation/validateLogIn";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = () => {
  const [error, setError] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, validateLogIn, LogIn);

  const { email, password } = values;

  async function LogIn() {
    try {
      await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      console.error("Hubo un error al autenticar el usuario", error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1 className='create-account-title text-center'>Iniciar Sesion</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className='form-field'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                placeholder='Tu email'
                name='email'
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            {errors.email && (
              <div className='error-message text-center'>{errors.email}</div>
            )}

            <div className='form-field'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Tu Password'
                name='password'
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            {errors.password && (
              <div className='error-message text-center'>{errors.password}</div>
            )}

            {error && <div className='error-message text-center'>{error}</div>}

            <input className='form-btn' type='submit' value='Iniciar Sesion' />
          </form>
        </>
      </Layout>
    </div>
  );
};

export default Login;
