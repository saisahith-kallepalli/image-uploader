import React, { useState } from "react";
import { useDropboxChooser } from "use-dropbox-chooser";
import DropBoxImage from "./../../images/icons8-dropbox-color/icons8-dropbox-144.svg";
import "./DropboxFileSelector.scss";
export type DropboxFileSelectorProps = {
  onUpload: (fileValues: Array<File>) => void;
  uploadedFiles: Array<File>;
};

export const DropboxFileSelector = (props: DropboxFileSelectorProps) => {
  const { onUpload, uploadedFiles } = props;
  const urlToObject = async (image: string, name: string) => {
    const response = await fetch(image);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], name, { type: blob.type });
    return file;
  };
  const { open, isOpen } = useDropboxChooser({
    appKey: "0msihfpamms1o00",
    chooserOptions: { linkType: "direct", multiselect: true },
    onSelected: async (files) => {
      console.log(files);
      let Data = [];
      for (let file of files) {
        const getData = await urlToObject(file.link, file.name);
        Data.push(getData);
      }
      console.log(Data);
      onUpload([...uploadedFiles, ...Data]);
    },
  });
  return (
    <div className="DropboxFileSelector-container">
      <img src={DropBoxImage} alt="DropBoxImage" />
      <button
        type="button"
        onClick={open}
        disabled={isOpen}
        className="btn btn-success">
        {" "}
        Upload From DropBox
      </button>
    </div>
  );
};
