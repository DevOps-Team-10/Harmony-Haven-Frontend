import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import React from 'react';
import Event from './components/Event'
import Shop from "./components/Shop";
import Track from "./components/Track";
import Blog from "./components/Blog";
import Learn from "./components/Learn";
import Error from "./components/Error";
import ReactDOM from 'react-dom/client';
import './index.css'

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
