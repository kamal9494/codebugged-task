import { useState, useContext, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import * as faceapi from "face-api.js";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import ImageUpload from "./components/ImageUpload";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { UserContext } from "./contexts/UserContext";
import UserView from "./components/Views/UserView";

function App() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const loadModels = async () => {
      setLoading(true);
      try {
        const MODEL_URL = "/models";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        ]);
        console.log("Face-API.js models loaded");
      } catch (error) {
        console.error("Error loading models:", error);
      } finally {
        setLoading(false);
      }
    };

    loadModels();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-xl font-medium">
        Loading...
      </div>
    );

  return (
    <>
      <Navbar />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route
          path="/"
          element={
            <UserView user={user}>
              <Home />
            </UserView>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/upload"
          element={
            <UserView user={user}>
              <ImageUpload />
            </UserView>
          }
        />
      </Routes>
    </>
  );
}

export default App;
