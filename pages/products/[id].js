/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";

const Product = () => {
  //state del componente
  const [product, setProduct] = useState({});
  //Routing para obtener el id actual
  const Router = useRouter();
  const {
    query: { id },
  } = Router;

  console.log(id);

  //Context del firebase
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        const productQuery = doc(firebase.db, "products", id);
        const product = await getDoc(productQuery);
        setProduct(product.data());
      };
      getProduct();
    }
  }, [id]);

  return (
    <>
      <h1>Desde {id}</h1>
    </>
  );
};

export default Product;
