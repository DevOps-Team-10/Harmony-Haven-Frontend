import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header.js"; // Added .js extension
import Body from "./components/Body.js"; // Added .js extension
import React from 'react';
import Event from "./components/Event.js"; // Added .js extension
import Shop from "./components/shopping/shop.js"; // Added .js extension
import Track from "./components/Track.js"; // Added .js extension
import Blog from "./components/Blog.js"; // Added .js extension
import Learn from "./components/Learn.js"; // Added .js extension
import Error from "./components/Error.js"; // Added .js extension
import ReactDOM from 'react-dom/client';
import './index.css';

// Store the token in localStorage
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2ltYSIsImVtYWlsIjoic2ltYTEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MTY3NDUzODEsImV4cCI6MTcxNjgzMTc4MX0.-n0k8ABh5P-TPc8Et6NcT3RgGahHxa0pfZqQv5b7gx8";
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
    element: <App />,
    errorElement: <Error />,
    children: [
      {path: '/',
      element: <Body />},
      {
        path: '/events',
        element: <Event/>
      },
      {
        path: '/learn',
        element: <Learn />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/track',
        element: <Track />
      },
      {
        path: '/blog',
        element: <Blog />
      }
    ]
  },
  {
    path: '/learn',
    element: <Learn />
  },
  {
    path: '/shop',
    element: <Shop />
  },
  {
    path: '/track',
    element: <Track />
  },
  {
    path: '/blog',
    element: <Blog />
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter} />
);
