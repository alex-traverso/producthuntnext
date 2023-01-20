import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import ProductDetail from "../components/layout/ProductDetail";
import useProducts from "../hooks/useProducts";
import { Router, useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  const { products } = useProducts("createdAt");
  const [result, setResult] = useState([]);

  useEffect(() => {
    const search = q?.toLowerCase();
    const filter = products.filter((product) => {
      return (
        product.name?.toLowerCase().includes(search) ||
        product.description?.toLowerCase().includes(search)
      );
    });
    setResult(filter);
  }, [q, products]);

  return (
    <div>
      <Layout>
        <div className='product-list'>
          <div className='products-container'>
            <ul className='bg-white '>
              {result.map((product) => (
                <ProductDetail key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Search;
