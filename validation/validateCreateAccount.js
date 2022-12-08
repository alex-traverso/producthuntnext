export default function validateCreateAccount(values) {
  let errors = {};

  // validar el nombre de usuario
  if (!values.name) {
    errors.name = "El nombre es obligatorio";
  }

  // validar el email
  if (!values.email) {
    errors.email = "El email es obligatorio";
  } else if (
    !(
      // regex validation
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    )
  ) {
    errors.email = "Email no valido";
  }

  // validar el password
  if (!values.password) {
    errors.password = "El password es obligatorio";
  } else if (values.password.length < 6) {
    errors.password = "El password debe contener por lo menos 6 caracteres";
  }
  console.log(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
  );

  return errors;
}
