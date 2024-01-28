import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

/**
 * Import Component
 */
const Auth = React.lazy(() => import("./page/auth"));
const Home = React.lazy(() => import("./page/home"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Home />} />
      <Route path="auth" element={<Auth />} />
    </Route>
  )
);

export default router;
