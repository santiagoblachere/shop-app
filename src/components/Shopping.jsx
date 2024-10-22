import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './Shopping.module.css';
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { useContext } from "react";
import { CartContext, CartProvider } from './ContextProvider';

function Shop() {
  const { cart, setCart, products, loading, imagesLoaded } = useContext(CartContext);
  const { id } = useParams();
  const [cartCounter, setCartCounter] = useState(0);

  const handleCartClick = (product) => {
    const productForCart = {
      productId: product.id,
      productTitle: product.title,
      productPrice: product.price,
    };
    setCart((prevCart) => [...prevCart, productForCart]);
    setCartCounter(cartCounter + 1);
    console.log(cart);
  };

  return (
    <div>
      <div>
        <h1>{cartCounter}</h1>
        <Link to="cart">Cart</Link>
      </div>

      {loading || !imagesLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.bigContainer}>
          <h1>hola a todos, soy el shop</h1>
          <Link to="/">GO BACK. THIS IS SHIT</Link>

          {id === undefined ? (
            <div key="product-list" id="container" className={styles.container}>
              {products.map(product => {
                return (
                  <div className={styles.card} key={product.id}>
                    <h2>{product.title}</h2>
                    <img src={product.image} alt={product.title} />
                    <h3>${product.price}</h3>
                    <button onClick={() => handleCartClick(product)}>ADD TO CART</button>
                    <Link to={`/shop/${product.id}`}>DETAILS</Link>
                  </div>
                );
              })}
            </div>
          ) : products.find(product => product.id.toString() === id) ? (
            <div key={id}>
              <ProductDetail cartCounter={cartCounter} handleCartClick={handleCartClick} cart={cart} product={products.find(product => product.id.toString() === id)} />
            </div>
          ) : <h1>NOT FOUND</h1>}
        </div>
      )}
    </div>
  );
}

export default Shop;