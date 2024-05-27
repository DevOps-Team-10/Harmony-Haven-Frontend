import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import React from 'react';
import Event from "./components/Event.js";
import Shop from "./components/shopping/shop.js";
import Track from "./components/Track.js";
import Blog from "./components/Blog.js";
import Learn from "./components/Learn.js";
import Error from "./components/Error.js";
import ReactDOM from 'react-dom/client';
import './index.css';
import { CartProvider } from './context/CartContext.js';
import OrderDetails from "./components/shopping/OrderDetails.js";

// Store the token in localStorage
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmF2eWEiLCJlbWFpbCI6Im5hdnlhc2hldHR5QGdtYWlsLmNvbSIsImlhdCI6MTcxNjgxNTAxMiwiZXhwIjoxNzE2OTAxNDEyfQ.Gci0BMhhoZdcjG37l516fXDMYJuGpNpPbk_-W2jxTZQ";
localStorage.setItem('authToken', authToken);

function App() {
  return (
    <div className="App h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-grow overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <CartProvider>
        <App />
      </CartProvider>
    ),
    errorElement: <Error />,
    children: [
      { path: '/', element: <Body /> },
      { path: '/events', element: <Event /> },
      { path: '/learn', element: <Learn /> },
      { path: '/shop', element: <Shop /> },
      { path: '/track', element: <Track /> },
      { path: '/blog', element: <Blog /> }
    ]
  },
  { path: '/learn', element: <Learn /> },
  { path: '/shop', element: <Shop /> },
  { path: '/track', element: <Track /> },
  { path: '/blog', element: <Blog /> },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter} />
);
