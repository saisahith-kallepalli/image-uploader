import React, { useState } from "react";
import "./App.scss";
import UniversalFileUploaderModal from "./components/UniversalFileUploaderModal";

function App() {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  return (
    <div className="App">
      <h2>Image uploader</h2>
      <button className="btn btn-primary" onClick={handleOpen}>
        UploadImage
      </button>
      <UniversalFileUploaderModal
        show={show}
        handleClose={handleClose}
        size="xl"
        header="Upload Fills"
        mimeTypes={["image/png", "image/jpg"]}
        allowMultiple={true}
      />
    </div>
  );
}

export default App;
