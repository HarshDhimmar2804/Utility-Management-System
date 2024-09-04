import React, { useEffect, useState } from "react";
import AppLayout from "./components/AppLayout";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Task from "./components/Task";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:9000/auth/check", {
          withCredentials: true, // Include credentials (cookies)
        });

        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error.message);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Set loading to false after the check
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    // Show a loading spinner or message while checking authentication
    return (
      <div className="flex w-screen h-screen justify-center items-center text-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" gutter={8} />
      <Routes>
        <Route
          exact
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/:projectId"
          element={
            isAuthenticated ? (
              <AppLayout>
                <Task />
              </AppLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AppLayout>
                <div className="flex flex-col items-center w-full pt-10">
                  <img src="./image/welcome.svg" className="w-5/12" alt="" />
                  <h1 className="text-lg text-gray-600">
                    Select or create new project
                  </h1>
                </div>
              </AppLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
