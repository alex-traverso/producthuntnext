/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Layout from "../components/layout/Layout";
import ProductDetail from "../components/layout/ProductDetail";
import useProducts from "../hooks/useProducts";

const Home = () => {
  const { products } = useProducts("createdAt");

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

export default Home;
