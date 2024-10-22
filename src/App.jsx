import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartProvider, CartContext } from './components/ContextProvider';

function App() {
  const { cart, setCart, products, loading } = useContext(CartContext);
  return (
    <>
      <h1>Random nameless, loveless shop</h1>
      <Link to="/shop">Shop</Link>
    </>
  )
}

export default function AppWrapper() {
  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
}