import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";
import * as faceapi from "face-api.js";
import api from "../api";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // const [models, setModels] = useState(false);
  const [detection, setDetection] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [userDescriptor, setUserDescriptor] = useState(null);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");

  const nav = useNavigate();

  const detectFace = async () => {
    console.log("detecting");
    setDetection(true);
    const video = webcamRef.current.video;
    setCapturedImage(webcamRef.current.getScreenshot());
    try {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length === 0) {
        toast.warning("No face detected, Try Again!");
        setDetection(false);
        return;
      }

      const descriptors = detections.map((face) => face.descriptor);
      setUserDescriptor(descriptors);
    } catch (error) {
      toast.error(error);
    }
    setDetection(false);
  };

  const handleCapture = async () => {
    setLoading(true);

    if (!username) {
      toast.warning("Enter your Username");
      setLoading(false);
      return;
    }

    try {
      const formData = {
        username,
        base64Img: capturedImage,
        descriptors: userDescriptor,
      };

      const url = "https://codebugged-server.vercel.app/api/users/register"; // Replace with your backend endpoint
      const method = "POST";
      const response = await api(url, method, formData);
      console.log(response);
      if (response.status === 200) {
        toast.success("User created successfully");
        nav("/login");
      } else if (response.status === 400) {
        toast.error("username already exists");
      } else {
        toast.error("Something went wrong!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response.status === 400) {
        toast.error("username already exists");
      } else toast.error("Error capturing face, try again!");
    }
  };

  return (
    <div className="bg-black min-h-screen h-full flex flex-col gap-5 items-center px-7">
      <h2 className="text-white text-4xl mt-10 font-medium mb-10">
        Registration
      </h2>
      <div className="w-full flex flex-col max-w-[500px] min-w-[300px] mb-4">
        <div>
          <h1 className="text-white text-sm md:text-md lg:text-lg font-medium py-3">Username</h1>
          <input
            type="text"
            className="px-4 py-4 focus:outline-none w-full rounded bg-gray-800 text-white mb-1"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="py-3 flex gap-4 items-center justify-between">
          <div className="flex gap-5">
            <h1 className="text-white text-sm md:text-md lg:text-lg font-medium py-3">
              Is you Face Detected ?
            </h1>
            <div className="flex gap-5">
              {userDescriptor ? (
                <svg
                  className="w-8 md:w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                      fill="green"
                    ></path>
                  </g>
                </svg>
              ) : (
                <svg
                  className="w-8 md:w-10"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                  fill="#ff0000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>cross-square</title>{" "}
                    <desc>Created with Sketch Beta.</desc> <defs> </defs>
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                      sketch:type="MSPage"
                    >
                      <g
                        id="Icon-Set-Filled"
                        sketch:type="MSLayerGroup"
                        transform="translate(-206.000000, -1037.000000)"
                        fill="#ff0000"
                      >
                        <path
                          d="M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z"
                          id="cross-square"
                          sketch:type="MSShapeGroup"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              )}
            </div>
          </div>
          <button
            className={`bg-purple-600 hover:bg-purple-700 min-w-[80px] max-w-[70px] md:max-w-[120px] w-full text-white px-4 rounded-md h-10
            ${
              userDescriptor || detection ? "opacity-50 cursor-not-allowed" : ""
            }
          }`}
            onClick={detectFace}
            disabled={userDescriptor || detection}
          >
            {detection ? "Detecting..." : "Detect"}
          </button>
        </div>

        {userDescriptor ? (
          <div className="max-w-[500px] flex flex-col items-center w-full min-w-[300px]">
            <img src={capturedImage} alt="preview" />
          </div>
        ) : (
          <div className="max-w-[500px] flex flex-col items-center w-full min-w-[300px]">
            <Webcam
              className="rounded-xl"
              screenshotFormat="image/jpeg"
              audio={false}
              ref={webcamRef}
              // onUserMedia={() => startFaceDetection()}
            />
            <small className="text-red-600 m-2 text-md">
              Make sure your face is clearly visible
              {/* click on login when you face detection is visible on your face */}
            </small>
          </div>
        )}
      </div>

      <div className="flex items-center flex-col gap-1 w-full">
        <button
          className={`bg-blue-600 font-medium w-full text-white max-w-[400px] min-w-[300px] py-2 rounded-md px-4 ${
            loading || !userDescriptor || !username
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={handleCapture}
          disabled={loading || !userDescriptor || !username}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-blue-800 p-5">
          <NavLink to="/login">Already user? Sign In here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
