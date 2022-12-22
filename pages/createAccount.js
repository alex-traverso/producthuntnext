import React, { useState } from "react";
import Layout from "../components/layout/Layout";

import firebase from "../firebase";

// validaciones
import useValidation from "../hooks/useValidation";
import validateCreateAccount from "../validation/validateCreateAccount";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const CreateAccount = () => {
  const [error, setError] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, validateCreateAccount, createAccount);

  const { name, email, password } = values;

  async function createAccount() {
    try {
      await firebase.register(name, email, password);
    } catch (error) {
      console.log(
        "Hubo un error al crear el usuario",
        error.localizedDescription
      );
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1 className='create-account-title text-center'>Crear Cuenta</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className='form-field'>
              <label htmlFor='name'>Nombre</label>
              <input
                type='text'
                id='name'
                placeholder='Tu nombre'
                name='name'
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

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

            <input className='form-btn' type='submit' value='Crear Cuenta' />
          </form>
        </>
      </Layout>
    </div>
  );
};

export default CreateAccount;
