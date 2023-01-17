/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import Layout from "../../components/Layout/Layout";
import Error404 from "../../components/layout/404";
import Spinner from "../../components/ui/Spinner";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Button from "../../components/ui/Button";

const Product = () => {
  //state del componente
  const [product, setProduct] = useState({});
  const [consultDB, setConsultDB] = useState(true);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState({});
  //Routing para obtener el id actual
  const Router = useRouter();
  const {
    query: { id },
  } = Router;

  //Context del firebase
  const { firebase, user } = useContext(FirebaseContext);

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
  }, [id, product]);

  /* if (Object.keys(product).length === 0) return <Spinner />; */
  /* {
  Object.keys(product).length === 0 ? <Spinner /> : null;
} */
  const {
    createdAt,
    company,
    description,
    name,
    image,
    url,
    votes,
    comments,
    creator,
    hasVoted,
  } = product;

  const voteProduct = () => {
    if (!user) {
      return Router.push("/login");
    }
    //obtener y sumar un nuevo voto
    const newTotal = votes + 1;
    if (hasVoted.includes(user.uid)) return;
    const newHasVoted = [...hasVoted, user.uid];

    //Actualizar la db
    const productRef = doc(firebase.db, "products", id);

    setDoc(
      productRef,
      {
        votes: newTotal,
        hasVoted: newHasVoted,
      },
      { merge: true }
    );

    //Actualizar el state
    setProduct({
      ...votes,
      votes: newTotal,
      hasVoted: newHasVoted,
    });
    setConsultDB(true);
  };

  const commentChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  //Crear comentario
  const addComment = (e) => {
    e.preventDefault();
    if (!user) {
      return Router.push("/login");
    }
    //informacion extra al comentario
    comment.userId = user.uid;
    comment.userName = user.displayName;

    //copia de comentarios y agregarlo al array
    const newComments = [...comments, comment];

    //Actualizar la DB
    const productRef = doc(firebase.db, "products", id);

    setDoc(
      productRef,
      {
        comments: newComments,
      },
      { merge: true }
    );

    //Actualizar el state
    setProduct({
      ...product,
      comments: newComments,
    });
    setConsultDB(true);
  };

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
              {creator ? (
                <p>
                  <strong>Por: {creator.name}</strong> de {company}
                </p>
              ) : null}
              <img src={image} alt={name} />
              <p>{description}</p>

              {user && (
                <>
                  <h2>Agrega tu comentario</h2>
                  <form className='product-comment-form' onSubmit={addComment}>
                    <fieldset>
                      <div className='form-field'>
                        <label htmlFor='name'>Comentario</label>
                        <input
                          type='text'
                          name='message'
                          placeholder='Comentario'
                          onChange={commentChange}
                        />
                      </div>
                      <input
                        className='form-btn'
                        type='submit'
                        value='Agregar un comentario'
                      />
                    </fieldset>
                  </form>
                </>
              )}
              <h2 className='comments-title'>Comentarios</h2>

              {comments === undefined ? (
                <p>No comments yet</p>
              ) : (
                <>
                  <ul>
                    {comments.length === 0 ? <p>No hay comentarios</p> : null}
                  </ul>
                  <ul>
                    {comments.map((comment, i) => (
                      <li key={`${comment.userId}-${i}`}>
                        <p>{comment.message}</p>
                        <p>
                          Escrito por:
                          <span> {comment.userName}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <aside>
              <Button target='_blank' href={url} bgColor='true'>
                Visitar la URL
              </Button>

              <div className='product-votes-container'>
                {user ? <Button onClick={voteProduct}>Votar</Button> : null}
                <p className='text-center'>{votes} Votos</p>
              </div>
            </aside>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Product;
