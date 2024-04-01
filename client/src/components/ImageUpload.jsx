import React from "react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import api from "../api";
import { RxCross1 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const uploadBtn = useRef(null);
  const nav = useNavigate();

  const handleUpload = async () => {
    setLoading(true);
    if (!selectedImage) {
      setError("No file selected");
      setLoading(false);
      return;
    }

    const formData = {
      base64Image: selectedImage,
    };

    try {
      const url = "https://codebugged-server.vercel.app/images";
      const method = "POST";
      const response = await api(url, method, formData);
      console.log(response);
      if (response.status === 200) {
        toast.success("Image Uploaded");
        nav("/");
      }
    } catch (error) {
      setError("Error while calling API "+ error);
      console.error("Error calling API:", error);
    }
    setLoading(false);
    setSelectedImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const render = new FileReader();
      render.onloadend = () => {
        setSelectedImage(render.result);
        console.log(selectedImage);
      };
      render.readAsDataURL(file);
    }
  };

  const handleUploadBtn = () => {
    uploadBtn.current.click();
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="h-fit min-h-screen bg-[#e5eef8] p-5 flex flex-wrap-reverse flex-col-reverse md:flex-row justify-center items-center md:gap-20 gap-2">
      <div className="p-10 bg-white min-w-[350px] max-w-[600px] w-full rounded-lg shadow-md flex flex-col items-center gap-5">
        <div className="w-full text-center">
          <label className="text-red-500">{error && error}</label>
        </div>
        {selectedImage && (
          <div className="w-full flex justify-end">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
        )}
        {selectedImage && (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl p-2 text-center font-semibold">
              Preview Image
            </h1>
            <img
              src={selectedImage}
              alt="Preview"
              className="w-fit mb-4 rounded"
            />
          </div>
        )}
        {selectedImage ? (
          <button
            className="bg-[#e82255] w-[200px] h-[60px] font-semibold flex justify-center items-center text-[#fff] rounded-2xl gap-3 cursor-pointer"
            onClick={handleUpload}
            disabled={loading}
          >
            <p>{loading ? "Uploading..." : "Upload"}</p>
          </button>
        ) : (
          <button
            className="bg-[#e82255] w-[200px] h-[60px] font-semibold flex justify-center items-center text-[#fff] rounded-2xl gap-3 cursor-pointer"
            onClick={handleUploadBtn}
            disabled={loading}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={uploadBtn}
            />
            <svg viewBox="0 0 24 24" className="w-[30px]" data-v-069cba0d="">
              <path
                fill="currentColor"
                d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 2L6.46 7.46L7.88 8.88L11 5.75V15H13V5.75L16.13 8.88L17.55 7.45L12 2Z"
                data-v-069cba0d=""
              ></path>
            </svg>
            <p>Upload Image</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
