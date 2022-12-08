import React, { useState, useEffect } from "react";

const useValidation = (initialState, validate, fn) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0;

      if (noErrors) {
        fn(); /* funcion que ejecuta el componente */
      }
      setSubmitForm(false);
    }
    //eslint-disable-next-line
  }, [errors]);

  /* Funcion que se ejecuta conforme el usuario escribe algo */
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Funcion que se ejecuta cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitForm(true);
  };

  // cuando se realiza el evento de blur
  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

export default useValidation;
