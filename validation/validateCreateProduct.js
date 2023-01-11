export default function validateCreateProduct(values) {
  let errors = {};

  // validar el nombre del producto
  if (!values.name) {
    errors.name = "El nombre es obligatorio";
  }

  // validar la empresa
  if (!values.company) {
    errors.company = "El nombre de la empresa es obligatorio";
  }

  // validar la url
  if (!values.url) {
    errors.url = "La url del producto es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^"]+$/.test(values.url)) {
    errors.url = "URL mal formateada o no válida";
  }

  // validar descripcion
  if (!values.description) {
    errors.description = "Agrega una descripción de tu producto";
  }

  return errors;
}
