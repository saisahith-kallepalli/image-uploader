import React, { useState } from "react";
import { useDropboxChooser } from "use-dropbox-chooser";
import DropBoxImage from "./../../images/Group 1.png";
import "./DropboxFileSelector.scss";
export type DropboxFileSelectorProps = {
  onUpload: (fileValues: Array<any>) => void;
  uploadedFiles: Array<any>;
  allowMultiple: boolean;
  changeUploading: (load: boolean) => void;
};

export const DropboxFileSelector = (props: DropboxFileSelectorProps) => {
  const { onUpload, uploadedFiles, changeUploading, allowMultiple } = props;
  const urlToObject = async (image: string, name: string) => {
    const response = await fetch(image);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], name, { type: blob.type });
    return file;
  };

  /*
   *this is "use-dropbox-chooser" form that imported useDropboxChooser get "apiKey" from developer mode
   *in dropbox from that getting the image like and converted in to file object and uploaded the File by using onUpload function which is available at "DropboxFileSelectorProps"
   */
  const { open, isOpen } = useDropboxChooser({
    appKey: "0msihfpamms1o00",
    chooserOptions: { linkType: "direct", multiselect: allowMultiple },
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
DropboxFileSelector.defaultProps = {
  type: "file",
  mimeTypes: [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/svg+xml",
    "image/svg",
  ],
  allowMultiple: false,
  maxSize: 5,
};
