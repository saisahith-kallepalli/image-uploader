import React, { useRef, useState } from "react";
import "./LocalFileUploader.scss";
export type LocalFileUploaderProps = {
  onUpload: (fileValues: Array<File>) => void;
  mimeTypes: Array<string>;
  uploadedFiles: Array<File>;
};

export const LocalFileUploader = (props: LocalFileUploaderProps) => {
  const { onUpload, mimeTypes, uploadedFiles } = props;
  const fileInputRef = useRef<HTMLInputElement>();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const stopReload = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.preventDefault();
  };
  const handleDrag = function (e: any) {
    stopReload(e);
    console.log(e);
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  // triggers when file is dropped
  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    stopReload(e);
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = e.dataTransfer.files;
      let fileValues = Object.values(files);
      fileValues = fileValues.filter((value) => mimeTypes.includes(value.type));
      const totalFiles = [...uploadedFiles, ...fileValues];
      onUpload(totalFiles);
      console.log(fileValues);
    }
  };
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
      <h2>Drag and Drop File</h2>
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
        <div className="btn btn-primary m-auto">Choose your File</div>
      </label>
    </div>
  );
};
