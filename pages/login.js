import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Router from "next/router";
import firebase from "../firebase";

// validaciones
import useValidation from "../hooks/useValidation";
import validateLogIn from "../validation/validateLogIn";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const Login = () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, validateLogIn, logIn);

  const { name, email, password } = values;

  async function logIn() {
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
          <h1 className='create-account-title text-center'>Iniciar Sesión</h1>
          <form className='form-login' onSubmit={handleSubmit} noValidate>
            {errors.name && (
              <div className='error-message text-center'>{errors.name}</div>
            )}

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

            <input className='form-btn' type='submit' value='Iniciar Sesión' />
          </form>
        </>
      </Layout>
    </div>
  );
};

export default Login;
