import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      try {
        const data = await response.json();
        setProducts(data);
        const images = data.map(product => product.image);
        const imagePromises = images.map(image => {
          return new Promise(resolve => {
            const img = new Image();
            img.onload = resolve;
            img.src = image;
          });
        });
        Promise.all(imagePromises).then(() => {
          setImagesLoaded(true);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  return (
    <CartContext.Provider value={{ cartCounter, setCartCounter, cart, setCart, products, setProducts, loading, setLoading, imagesLoaded, setImagesLoaded}}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };