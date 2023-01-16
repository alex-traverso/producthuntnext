import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/layout/Layout";

import firebase from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Router from "next/router";

// validaciones
import useValidation from "../hooks/useValidation";
import validateCreateProduct from "../validation/validateCreateProduct";
import { FirebaseContext } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

//Error404
import Error404 from "../components/layout/404";

const INITIAL_STATE = {
  name: "",
  company: "",
  image: "",
  url: "",
  description: "",
};

const NewProduct = () => {
  const [error, setError] = useState(false);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, validateCreateProduct, createProduct);

  const { name, company, image, url, description } = values;

  //context con las operaciones crud de firebase
  const { user, firebase } = useContext(FirebaseContext);

  async function createProduct() {
    //si el usuario no esta autenticado llevar al login
    if (!user) {
      Router.push("/login");
    }
    //crear el objeto de nuevo producto
    const product = {
      name,
      company,
      url,
      image: imgURL,
      description,
      votes: 0,
      comments: [],
      createdAt: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName,
      },
    };

    console.log(product);

    //insertarlo en la base de datos
    await addDoc(collection(firebase.db, "products"), product);
    return Router.push("/");
  }

  useEffect(() => {
    if (task) {
      //Progreso
      task.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        //En caso de error
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
            // ...
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        //Proceso completado
        () => {
          getDownloadURL(task.snapshot.ref).then((downloadURL) => {
            setImgURL(downloadURL);
            console.log("File available at", downloadURL);
          });
        }
      );
    }
  }, [task]);

  const uploadImage = (file) => {
    const storageRef = ref(firebase.storage, `/posts ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return uploadTask;
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const task = uploadImage(file);
    setTask(task);
  };

  return (
    <div>
      <Layout>
        {!user ? (
          <Error404 />
        ) : (
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
                    onChange={(file) => {
                      handleUpload(file);
                    }}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.image ? (
                  <div className='error-message text-center'>
                    {errors.image}
                  </div>
                ) : null}
                <div className='form-field'>
                  <label htmlFor='url'>URL</label>
                  <input
                    placeholder='URL del producto'
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

              {/*  {error ? (
              <div className='error-message text-center'>{error}</div>
            ) : null} */}

              <input
                className='form-btn'
                type='submit'
                value='Crear Producto'
              />
            </form>
          </>
        )}
      </Layout>
    </div>
  );
};

export default NewProduct;
