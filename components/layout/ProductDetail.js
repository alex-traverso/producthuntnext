/* eslint-disable @next/next/no-img-element */
import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Link from "next/link";

const ProductDetail = ({ product }) => {
  const {
    id,
    createdAt,
    company,
    description,
    name,
    image,
    url,
    votes,
    comments,
  } = product;
  return (
    <>
      <li className='product'>
        <div className='product-description'>
          <div>
            <img className='product-img' src={image} alt={name} />
          </div>
          <div>
            <Link legacyBehavior href='/products/[id]' as={`/products/${id}`}>
              <a className='product-title'>{name}</a>
            </Link>
            <p className='product-description'>{description}</p>
            <div className='comments-container'>
              <div className='product-comments'>
                <img
                  className='comments-icon'
                  src='/static/image/coment-icon.png'
                  alt='comments'
                />
                <p className='comments-info'> Comentarios</p>
              </div>
            </div>
            <p>
              Publicado hace{" "}
              {formatDistanceToNow(new Date(createdAt), { locale: es })}
            </p>
          </div>
        </div>
        <div className='votes-container'>
          <div className='votes-icon'>&#9650;</div>
          <p className='votes-number'>{votes}</p>
        </div>
      </li>
    </>
  );
};

export default ProductDetail;
