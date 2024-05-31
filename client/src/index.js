import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import React, { useEffect, useState } from 'react';
import Event from "./components/Event.js";
import Shop from "./components/shopping/shop.js";
import Track from "./components/Track.js";
import Blog from "./components/Blog.js";
import Learn from "./components/Learn.js";
import Error from "./components/Error.js";
import ReactDOM from 'react-dom/client';
import Community from "./components/community.js";
import CommunityChat from "./components/CommunityChat.js";
import AboutMe from "./components/AboutMe.js"; // New component
import './index.css';
import { CartProvider } from './context/CartContext.js';
import UserContext from "./context/UserContext.js";
import LandingAuth from "./components/LandingAuth.js";

// Store the token in localStorage (assuming you have this functionality)
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmFjayIsImVtYWlsIjoiamFjazI0QGdtYWlsLmNvbSIsImlhdCI6MTcxNjkxOTMzOCwiZXhwIjoxNzE3MDA1NzM4fQ.k5wPBKlQ8OqfovkMvDvT1w890KM5OSG98DOSTw4A-eE";
localStorage.setItem('authToken', authToken);

// const userId = "6656184d0c4cf4b05afad02a";
// localStorage.setItem('userId', userId);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App h-screen flex flex-col overflow-hidden">
        {user ? ( // Check if user is logged in
          <>
            <Header />
            <div className="flex-grow overflow-hidden">
              <Outlet />
            </div>
          </>
        ) : (
          <LandingAuth />
        )}
      </div>
    </UserContext.Provider>
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
      { path: '/community/:id/chat', element: <CommunityChat /> },
      { path: '/about-me', element: <AboutMe /> } // New route
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter} />
);
