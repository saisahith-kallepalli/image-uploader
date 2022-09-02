import React, { useState } from "react";
import { useDropboxChooser } from "use-dropbox-chooser";
import DropBoxImage from "./../../images/Group 1.png";
import "./DropboxFileSelector.scss";
export type DropboxFileSelectorProps = {
  onUpload: (fileValues: Array<any>) => void;
  uploadedFiles: Array<any>;
  changeUploading: (load: boolean) => void;
};

export const DropboxFileSelector = (props: DropboxFileSelectorProps) => {
  const { onUpload, uploadedFiles, changeUploading } = props;
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
      changeUploading(true);
      let Data = [];
      for (let file of files) {
        const getData = await urlToObject(file.link, file.name);
        Data.push(getData);
      }
      changeUploading(false);
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
