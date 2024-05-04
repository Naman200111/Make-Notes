import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import Notes from "./components/Notes/Notes";
import SignUp from "./components/Signup/Signup";
import Login from "./components/Login/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Notes />} />
      <Route path="login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />
};

export default App;
