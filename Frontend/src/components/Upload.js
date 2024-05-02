import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [shortLink, setShortLink] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      const fileResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(fileResponse);
      toast.success("File uploaded successfully!");
      setShortLink(fileResponse.data.url);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <h2 className="text-2xl font-bold mb-6">Upload Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {shortLink ? (
        <>
          {" "}
          <div className="mt-4 bg-blue-500 p-2 rounded-md">
            <a href={shortLink}>Download the file</a>
          </div>
          <div className="bg-gray-200 rounded-md p-4 mt-4">
            Link:{" "}
            <a
              className="hover:underline"
              href={shortLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortLink}
            </a>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Upload;
