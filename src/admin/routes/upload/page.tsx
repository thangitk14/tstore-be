import { RouteConfig } from "@medusajs/admin";
import { Input, Text } from "@medusajs/ui";
import Medusa from "@medusajs/medusa-js";
import { useState, useEffect } from "react";

const KEY_STORAGE_DOWNLOAD_FILES = 'KEY_STORAGE_DOWNLOAD_FILES';

const UploadPage = () => {
  const [files, setFiles] = useState([]); 

  useEffect(() => {
    setFiles(getUrlIntance())
  }, [])

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const getUrlIntance = () => { 
    const fileLocalStorage = localStorage.getItem(KEY_STORAGE_DOWNLOAD_FILES);
    if (fileLocalStorage === null ) {
      localStorage.setItem(KEY_STORAGE_DOWNLOAD_FILES, JSON.stringify([]));
      return [];
    }
    const storages = JSON.parse(fileLocalStorage);
    return storages;
  }
  
  const saveUrlIntance = (url) => { 
    const fileLocalStorage = localStorage.getItem(KEY_STORAGE_DOWNLOAD_FILES);
    if (!fileLocalStorage) {
      localStorage.setItem(KEY_STORAGE_DOWNLOAD_FILES, JSON.stringify([url]));
    }
    else {
      const storages = JSON.parse(fileLocalStorage);
      const storagePush = [url, ...storages]
      localStorage.setItem(KEY_STORAGE_DOWNLOAD_FILES, JSON.stringify(storagePush));
    }
  }
  
  const uploadFile = (file) => {
    const medusa = new Medusa({ baseUrl: process.env.MEDUSA_BACKEND_URL, maxRetries: 3 });
    medusa.admin.uploads.create(file)
      .then(({ uploads }) => {
        console.log({uploads});
        const url = uploads[0].url;
        saveUrlIntance(url);
        setFiles(getUrlIntance())
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert(`Error uploading file:${error}`);
      });
  };

  return (
    <div>
      <Input type="file" id="ipFile" onChange={handleFileChange} />
      {files.map((fileUrl) => {
        return (<Text>{fileUrl}</Text>)
      })}
    </div>
  );
};

export const config: RouteConfig = {
  link: {
    label: "Tải lên",
    icon: null,
  },
};

export default UploadPage;
