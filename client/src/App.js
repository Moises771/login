import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/**Import all components */

import Username from './components/Username.js'
import Password from './components/Password.js'
import Register from './components/Register.js'
import Profile from './components/Profile.js'
import Recovery from './components/Recovery.js'
import Reset from './components/Reset.js'
import Pagenotfound from './components/Username.js'



/**root routes */

const router = createBrowserRouter([
  {
    path : "/",
    element : <Username></Username>
  },
  {
    path : "/register",
    element : <Register></Register>
  },
  {
    path : "/password",
    element : <Password></Password>
  },  {
    path : "/profile",
    element : <Profile></Profile>
  },  {
    path : "/recovery",
    element : <Recovery></Recovery>
  },  {
    path : "/reset",
    element : <Reset></Reset>
  },  {
    path : "*",
    element : <Pagenotfound></Pagenotfound>
  },
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
