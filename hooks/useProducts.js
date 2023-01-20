import React, { useState, useContext, useEffect } from "react";
/* eslint-disable react-hooks/exhaustive-deps */
import { FirebaseContext } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export const useProducts = (order) => {
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    //Obtener productos
    const obtainProducts = () => {
      const querySnapshot = query(
        collection(firebase.db, "products"),
        orderBy(order, "desc")
      );

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

  return {
    products,
  };
};
