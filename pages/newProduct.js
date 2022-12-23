import React, { useState } from "react";
import Layout from "../components/layout/Layout";

import firebase from "../firebase";

// validaciones
import useValidation from "../hooks/useValidation";
import validateCreateProduct from "../validation/validateCreateProduct";

const INITIAL_STATE = {
  name: "",
  company: "",
  image: "",
  url: "",
  description: "",
};

const NewProduct = () => {
  const [error, setError] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, validateCreateProduct, createAccount);

  const { name, company, image, url, description } = values;

  async function createAccount() {
    try {
      await firebase.register(name, email, password);
      Router.push("/");
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
          <h1 className='create-account-title text-center'>Nuevo Producto</h1>
          <form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Informacion general</legend>
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
              {errors.name ? (
                <div className='error-message text-center'>{errors.name}</div>
              ) : null}
              <div className='form-field'>
                <label htmlFor='company'>Empresa</label>
                <input
                  type='text'
                  id='company'
                  placeholder='Nombre empresa o compañía'
                  name='company'
                  value={company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.company ? (
                <div className='error-message text-center'>
                  {errors.company}
                </div>
              ) : null}
              <div className='form-field'>
                <label htmlFor='image'>Imagen</label>
                <input
                  type='file'
                  id='image'
                  name='image'
                  value={image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.image ? (
                <div className='error-message text-center'>{errors.image}</div>
              ) : null}
              <div className='form-field'>
                <label htmlFor='url'>URL</label>
                <input
                  type='url'
                  id='url'
                  name='url'
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.url ? (
                <div className='error-message text-center'>{errors.url}</div>
              ) : null}
            </fieldset>

            <fieldset>
              <legend>Sobre el producto</legend>
              <div className='form-field'>
                <label htmlFor='description'>Descripción</label>
                <textarea
                  id='description'
                  name='description'
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {errors.description ? (
                <div className='error-message text-center'>
                  {errors.description}
                </div>
              ) : null}
            </fieldset>

            {error ? (
              <div className='error-message text-center'>{error}</div>
            ) : null}

            <input className='form-btn' type='submit' value='Crear Producto' />
          </form>
        </>
      </Layout>
    </div>
  );
};

export default NewProduct;
