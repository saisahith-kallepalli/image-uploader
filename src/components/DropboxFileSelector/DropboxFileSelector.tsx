import React, { useState } from "react";
// import DropboxChooser from 'react-dropbox-chooser-component';
export type DropboxFileSelectorProps = {};

export const DropboxFileSelector = (props: DropboxFileSelectorProps) => {
  const [url, setUrl] = useState("");
  function handleSuccess(files: any) {
    setUrl(files[0].thumbnailLink);
    console.log(url);
  }
  return (
    <div>
      {/* <DropboxChooser
        appKey={"your-uniq-app-key"}
        success={(files: any) => handleSuccess(files)}
        cancel={() => console.log("closed")}
        multiselect={true}>
        <div className="dropbox-button">Click me!</div>
      </DropboxChooser> */}
    </div>
  );
};
