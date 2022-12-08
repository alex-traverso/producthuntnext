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
      //validation
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z](2,)$/i.test(values.email)
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
    values.email,
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z](2,)$/i.test(values.email)
  );
  return errors;
}
