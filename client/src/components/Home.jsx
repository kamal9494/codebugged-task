import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { NavLink } from "react-router-dom";
import api from "../api";
import Popup from "./Popup";
import { toast } from "sonner";
import { MdDelete, MdFullscreen } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Home = () => {
  const { user } = useContext(UserContext);
  const [imgs, setImgs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const url = "https://codebugged-server.vercel.app/images";
        const method = "GET";
        const images = await api(url, method, null);
        setImgs(images.data);
        console.log(images.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    const filteredData = imgs.filter((img) => img._id !== id);
    setImgs(filteredData);
    try {
      const url = `https://codebugged-server.vercel.app/images/${id}`;
      const method = "DELETE";
      const response = await api(url, method, null);
      if (response.status === 200) {
        toast.success("Image deleted successfully");
      } else if (response.status === 400) {
        toast.error("Invalid image ID");
      } else if (response.status === 404) {
        toast.error("Image not found");
      } else {
        toast.error("Internal Server Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white min-h-[90vh] h-full">
      <h2 className="flex gap-1 text-3xl p-4 mt-5 justify-center">
        Hi, <b>{user?.name}</b>
      </h2>
      <div className="min-h-screen bg-gray-900 w-full p-5">
        <div className="w-full flex p-2 rounded-lg items-center justify-between">
          <h1 className="text-xl font-semibold">Your Images</h1>
          <NavLink
            className="bg-[#e82255] w-[130px] flex justify-center p-3 rounded-full text-white"
            to="/upload"
          >
            Upload Image
          </NavLink>
        </div>
        <div>
          {!imgs && (
            <div className="mt-[150px] flex justify-center">
              <AiOutlineLoading3Quarters className="animate-spin" size={25} />
            </div>
          )}
          {!loading && imgs && imgs.length === 0 && (
            <div className="mt-[50px] text-center">
              <p className="text-xl text-gray-500">There are no images...</p>
            </div>
          )}
          <div className="p-2 md:p-10 flex justify-center gap-5 flex-wrap">
            {imgs &&
              imgs.length > 0 &&
              imgs.map((img, index) => (
                <div
                  key={index}
                  className=" bg-gray-950 hover:scale-105 transition-all flex p-1 gap-3 flex-col"
                >
                  <img
                    src={img.base64Image}
                    alt={img.createdAt}
                    className="w-[300px] h-[300px] rounded max-h-[200px] object-cover"
                  />
                  <div className="flex justify-between px-3">
                    <AlertDialog>
                      <AlertDialogTrigger className="bg-red-500 flex items-center p-2 rounded">
                        <MdDelete size={23} />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your photo from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(img._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Dialog >
                      <DialogTrigger>
                        <MdFullscreen size={25} />
                      </DialogTrigger>
                      <DialogContent className="flex w-full justify-center">
                        <DialogDescription className="mt-5">
                            <img className="rounded" src={img.base64Image} alt={img.createdAt} />
                          </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* <Popup /> */}
      {/* <Modal modal={modal} /> */}
    </div>
  );
};

const Modal = (modal) => {
  if (modal) {
    return (
      <div className="absolute inset-0 w-full h-full  bg-red-500">
        <div className="flex w-full h-full items-center justify-center">
          <div className="h-[500px] w-full bg-gray-900">Hi</div>
        </div>
      </div>
    );
  }
};

export default Home;
