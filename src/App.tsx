import React, { useState } from "react";
import "./App.scss";
import UniversalFileUploaderModal from "./components/UniversalFileUploaderModal";

function App() {
  const [show, setShow] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<any>>([]);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const onUpload = (fileValues: Array<any>) => {
    setUploadedFiles([...fileValues]);
  };
  return (
    <div className="App">
      <h2>Image uploader</h2>
      <button className="btn btn-primary" onClick={handleOpen}>
        UploadImage
      </button>
      <UniversalFileUploaderModal
        show={show}
        handleClose={handleClose}
        handleOpen={handleOpen}
        size="xl"
        header="Upload Fills"
        mimeTypes={[
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/gif",
          "image/svg+xml",
          "image/svg",
        ]}
        allowMultiple={true}
        onUpload={onUpload}
        uploadedFiles={uploadedFiles}
      />
    </div>
  );
}

export default App;
