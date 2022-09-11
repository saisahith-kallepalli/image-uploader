import React, { useRef, useState } from "react";
import "./LocalFileUploader.scss";
import uploadImage from "./../../images/upload-cloud.png";
export type LocalFileUploaderProps = {
  onUpload: (fileValues: any) => void;
  mimeTypes: Array<string>;
  uploadedFiles: Array<
    | File
    | {
        name: string;
        size: number;
        location: string;
        mimeType: string;
      }
  >;
};

export const LocalFileUploader = (props: LocalFileUploaderProps) => {
  const { onUpload, mimeTypes, uploadedFiles } = props;
  const fileInputRef = useRef<HTMLInputElement>();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const stopReload = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.preventDefault();
  };

  //* handleDrag to setDragActive to true or false so we can check wether dragenter ot dragleave
  const handleDrag = function (e: any) {
    stopReload(e);
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // * handleDrop to get the files which or dropped and check whether its valid "mimeTypes" or not and the dropped files going to upload them by using onUpload Function 
  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    stopReload(e);
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = e.dataTransfer.files;
      let fileValues = Object.values(files);
      fileValues = fileValues.filter((value) => mimeTypes.includes(value.type));
      const totalFiles = [...uploadedFiles, ...fileValues];
      onUpload(totalFiles);
    }
  };

  //* onChangeUpload to Select the files directly from localFiles to upload them by using onUpload Function 
  const onChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    stopReload(e);
    const files = e.target.files || { value: "" };
    let fileValues = Object.values(files);
    fileValues = fileValues.filter((value) => mimeTypes.includes(value.type));
    const totalFiles = [...uploadedFiles, ...fileValues];
    onUpload(totalFiles);
  };
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center local-file-container "
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}>
      <img src={uploadImage} alt="Upload Image" />
      <h4>Drag and drop file here to upload</h4>
      <label htmlFor="file-upload">
        <input
          type="file"
          title="any"
          id="file-upload"
          accept={mimeTypes.join(",")}
          multiple={true}
          className="d-none"
          onChange={onChangeUpload}
        />
        <div className="btn btn-success m-auto">Import your file</div>
      </label>
    </div>
  );
};
