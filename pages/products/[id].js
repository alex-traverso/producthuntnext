/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import Layout from "../../components/Layout/Layout";
import Error404 from "../../components/layout/404";
import Spinner from "../../components/ui/Spinner";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Button from "../../components/ui/Button";
import Image from "next/image";

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
    if (id && consultDB) {
      const getProduct = async () => {
        const productQuery = doc(firebase.db, "products", id);
        const product = await getDoc(productQuery);
        if (product.exists()) {
          setProduct(product.data());
          setConsultDB(false);
        } else {
          setError(true);
          setConsultDB(false);
        }
      };
      getProduct();
    }
  }, [id]);

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

  const src = image;

  const commentChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  //Identifica si el comentario es del creador del producto
  const isCreator = (id) => {
    if (creator.id === id) {
      return true;
    }
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

  //funcion que revisa que el creador del producto sea el mismo que esta autenticado
  const canDelete = () => {
    if (!user) return false;
    if (creator.id === user.uid) {
      return true;
    }
  };

  const deleteProduct = async () => {
    if (!user) {
      return Router.push("/login");
    }
    if (creator.id !== user.uid) {
      return Router.push("/");
    }
    try {
      const productRef = doc(firebase.db, "products", id);
      await deleteDoc(productRef);
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
          <div id='container'>
            {Object.keys(product).length === 0 && !error ? <Spinner /> : null}
            <h1 id='product-title'>{product.name}</h1>
            <div className='product-container-id'>
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

                <div className='product-img-id-container'>
                  <Image
                    className='product-img-id'
                    loader={() => src}
                    src={src}
                    alt={name}
                    width={700}
                    height={450}
                  />
                </div>
                {/* <img  src={image} alt={name} /> */}
                <p>{description}</p>

                {user && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form
                      className='product-comment-form'
                      onSubmit={addComment}
                    >
                      <fieldset className='fieldset-product-id'>
                        <div className='form-field input-product-id'>
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
                  <p>No hay comentarios</p>
                ) : (
                  <>
                    <ul>
                      {comments.length === 0 ? <p>No hay comentarios</p> : null}
                    </ul>
                    <ul>
                      {comments.map((comment, i) => (
                        <li className='comments' key={`${comment.userId}-${i}`}>
                          <p>{comment.message}</p>
                          <p>
                            Escrito por:
                            <span className='font-bold'>
                              {" "}
                              {comment.userName}
                            </span>
                          </p>
                          {isCreator(comment.userId) && (
                            <p className='is-creator'>Es creador</p>
                          )}
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
            <div className='delete-btn-container'>
              {creator === undefined ? null : (
                <>
                  {canDelete() && (
                    <Button onClick={deleteProduct}>Borrar producto</Button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Product;
