import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
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
import Community from "./components/community.js";
import CommunityChat from "./components/CommunityChat.js";
import './index.css';
import { CartProvider } from './context/CartContext.js';


// Store the token in localStorage
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmFjayIsImVtYWlsIjoiamFjazI0QGdtYWlsLmNvbSIsImlhdCI6MTcxNjkxOTMzOCwiZXhwIjoxNzE3MDA1NzM4fQ.k5wPBKlQ8OqfovkMvDvT1w890KM5OSG98DOSTw4A-eE";
localStorage.setItem('authToken', authToken);

const userId ="6656184d0c4cf4b05afad02a"
localStorage.setItem('userId',userId)

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
      { path: '/blog', element: <Blog /> },
      { path: '/community', element: <Community /> },
      {path:"/community/:id/chat", element:<CommunityChat /> }

    ]
  },
  { path: '/learn', element: <Learn /> },
  { path: '/shop', element: <Shop /> },
  { path: '/track', element: <Track /> },
  { path: '/blog', element: <Blog /> },
  { path: '/community', element: <Community /> },
  {path:"/community/:id/chat", element:<CommunityChat />}

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter} />
);
