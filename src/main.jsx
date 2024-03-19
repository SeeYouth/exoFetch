import './index.scss';
import 'dotenv';

import React from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import App from './pages/app/App';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
