/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";
import useProducts from "../hooks/useProducts";
import ProductDetail from "../components/layout/ProductDetail";

const Populars = () => {
  const { products } = useProducts("votes");

  return (
    <div>
      <Layout>
        <div className='product-list'>
          <div className='products-container'>
            <ul className='bg-white '>
              {products.map((product, id) => (
                <ProductDetail key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Populars;
