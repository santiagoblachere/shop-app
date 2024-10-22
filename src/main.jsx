import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Shopping from './components/Shopping.jsx'
import { CartProvider } from './components/ContextProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "shop",
    element: <Shopping />
  },
  {
    path: "shop/:id",
    element: <Shopping />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider > 
      <RouterProvider router={router} />
    </CartProvider>  
  </StrictMode>,
)
