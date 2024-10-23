import styles from './Shopping.module.css';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { useContext } from "react";
import { CartContext } from "./ContextProvider";

function Shop() {
  const { setCartCounter, cartCounter, cart, setCart, products, loading, imagesLoaded } = useContext(CartContext);
  const { id } = useParams();

  const handleCartClick = (product) => {
    const productForCart = {
      productId: Math.random(),
      productTitle: product.title,
      productPrice: product.price,
      productImage: product.image,
    };
    setCart((prevCart) => [...prevCart, productForCart]);
    setCartCounter(cartCounter + 1);
  };

  return (
    <div className={styles.bigContainer}>
      <div className={styles.cartHeader}>
        <h1 className={styles.cartCounter}>{cartCounter}</h1>
        <Link to="cart" className={styles.cartLink}>Cart</Link>
      </div>

      {loading || !imagesLoaded ? (
        <h1 className={styles.loadingText}>Loading...</h1>
      ) : (
        <div>
          <h1 className={styles.shopTitle}>Generic Nameless, Loveless Shop</h1>
          <Link to="/" className={styles.backHomeLink}>home</Link>

          {id === undefined ? (
            <div key="product-list" className={styles.container}>
              {products.map((product) => (
                <div className={styles.card} key={product.id}>
                  <h2>{product.title}</h2>
                  <img src={product.image} alt={product.title} />
                  <h3>${product.price}</h3>
                  <button
                    onClick={() => handleCartClick(product)}
                    className={styles.addButton}
                  >
                    ADD TO CART
                  </button>
                  <Link to={`/shop/${product.id}`} className={styles.detailsLink}>
                    DETAILS
                  </Link>
                </div>
              ))}
            </div>
          ) : products.find((product) => product.id.toString() === id) ? (
            <div key={id}>
              <ProductDetail
                cartCounter={cartCounter}
                handleCartClick={handleCartClick}
                cart={cart}
                product={products.find((product) => product.id.toString() === id)}
              />
            </div>
          ) : (
            <h1 className={styles.loadingText}>NOT FOUND</h1>
          )}
        </div>
      )}
    </div>
  );
}

export default Shop;
