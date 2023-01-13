/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import Layout from "../../components/Layout/Layout";
import Error404 from "../../components/layout/404";
import Spinner from "../../components/ui/Spinner";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

const Product = () => {
  //state del componente
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  //Routing para obtener el id actual
  const Router = useRouter();
  const {
    query: { id },
  } = Router;

  //Context del firebase
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        const productQuery = doc(firebase.db, "products", id);
        const product = await getDoc(productQuery);
        if (product.exists()) {
          setProduct(product.data());
        } else {
          setError(true);
        }
      };
      getProduct();
    }
  }, [id]);

  /* if (Object.keys(product).length === 0) return <Spinner />; */
  /* {
  Object.keys(product).length === 0 ? <Spinner /> : null;
} */
  const { createdAt, company, description, name, image, url, votes, comments } =
    product;

  return (
    <Layout>
      <>
        {error ? <Error404 /> : null}

        <div id='container'>
          <h1 id='product-title'>{product.name}</h1>
          <div className='product-container-id'>
            {Object.keys(product).length === 0 ? <Spinner /> : null}
            <div>
              {createdAt ? (
                <p>
                  Publicado hace{" "}
                  {formatDistanceToNow(new Date(createdAt), { locale: es })}
                </p>
              ) : null}
              <img src={image} alt={name} />
              <p>{description}</p>

              <h2>Agrega tu comentario</h2>
              <form>
                <fieldset>
                  <div className='form-field'>
                    <label htmlFor='name'>Comentario</label>
                    <input
                      type='text'
                      name='message'
                      placeholder='Comentario'
                    />
                  </div>
                  <input
                    className='form-btn'
                    type='submit'
                    value='Agregar un comentario'
                  />
                </fieldset>
              </form>
              <h2 className='comments-title'>Comentarios</h2>
              {/* {comments.map((comment) => {
                <li>
                  <p>{comment.name}</p>
                  <p>Escrito por: {comment.userName}</p>
                </li>;
              })} */}
            </div>
            <aside>2</aside>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Product;
