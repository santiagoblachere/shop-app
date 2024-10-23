
import { useContext } from "react";
import { CartContext } from "./ContextProvider";
import { Link } from "react-router-dom";
import styles from './Cart.module.css';

export default function Cart() {
  const { setCartCounter, cartCounter, cart, setCart, products, loading, imagesLoaded } = useContext(CartContext);

  const handleRemoveFromCart = (cart, productId) => {
    setCart(cart.filter((product) => product.productId !== productId));
    setCartCounter(cartCounter - 1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.cartHeader}>CART</h1>
      <Link to="/shop" className={styles.backLink}>Back</Link>
      {cart.map(product => (
        <div key={product.id} className={styles.productCard}>
          <div className={styles.productInfo}>
            <img src={product.productImage} alt={product.productTitle} className={styles.productImage} />
            <div>
              <h2 className={styles.productTitle}>{product.productTitle}</h2>
              <h3 className={styles.productPrice}>${product.productPrice}</h3>
            </div>
          </div>
          <button onClick={() => handleRemoveFromCart(cart, product.productId)} className={styles.removeButton}>REMOVE</button>
        </div>
      ))}
    </div>
  );
}
