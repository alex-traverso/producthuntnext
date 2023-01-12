/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ProductDetail from "../components/layout/ProductDetail";

const Home = () => {
  const [products, setProducts] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    //Obtener productos
    const obtainProducts = () => {
      const querySnapshot = collection(firebase.db, "products");
      onSnapshot(querySnapshot, ({ docs }) => {
        const newProducts = docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;

          return {
            ...data,
            id,
          };
        });
        setProducts(newProducts);
      });
    };
    obtainProducts();
  }, []);

  return (
    <div>
      <Layout>
        <div className='product-list'>
          <div className='products-container'>
            <ul className='bg-white'>
              {products.map((product, id) => (
                <ProductDetail key={id} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
