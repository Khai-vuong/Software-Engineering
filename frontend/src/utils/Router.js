import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import GuestUserHomePage from "../pages/guestuser/HomePage";

const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/guest"
            element={
              <Layout>
                <GuestUserHomePage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;