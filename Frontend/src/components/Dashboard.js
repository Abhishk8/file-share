import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const [userFiles, setUserFiles] = useState([]);
  const handleDeleteFile = async (fileId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/v1/files/${fileId}`
      );
      // Remove the deleted file from the state
      setUserFiles(userFiles.filter((file) => file._id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/auth/userfiles`
        );
        console.log(response.data);
        setUserFiles(response.data.links);
      } catch (error) {
        console.error("Error fetching user files:", error);
      }
    };

    fetchUserFiles();
  }, [auth]);
  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-4">
        <p className="font-bold">Name:</p>
        <p>{auth?.user?.username}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Email:</p>
        <p>{auth?.user?.email}</p>
      </div>
      <div>
        <p className="font-bold">Number of Files Uploaded:</p>
        <p>{userFiles.length}</p>
      </div>
      <div>
        <p className="font-bold ">Links of Files</p>
        {userFiles?.map((file, index) => (
          <div
            key={file._id}
            className="mt-3 p-1  flex justify-between items-center"
          >
            <div className="flex  space-x-2">
              <div>{file.shortUrl}</div>
              <button
                onClick={() => handleDeleteFile(file._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
