import React, { useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import { CallbackDoc } from "react-google-drive-picker/dist/typeDefs";
import { useGoogleApi } from "react-gapi";
import DriveImage from "./../../images/g-drive.png";
import GooglePicker from "react-google-picker";
import axios from "axios";
import "./GoogleFileSelector.scss";
// import { downloadFile } from "../../download";
import { saveAs } from "file-saver";
export type GoogleFileSelectorProps = {
  mimeTypes: Array<string>;
  handleOpen: () => void;
  handleClose: () => void;
  changeUploading: (load: boolean) => void;
  onUpload: (fileValues: Array<any>) => void;
  uploadedFiles: Array<any>;
};
export const GoogleFileSelector = (props: GoogleFileSelectorProps) => {
  const {
    mimeTypes,
    handleOpen,
    handleClose,
    onUpload,
    changeUploading,
    uploadedFiles,
  } = props;
  const [token, setToken] = useState("");

  const callbackFunction = async (data: any) => {
    if (data.action === "cancel") {
      handleOpen();
    } else if (data.action === "picked") {
      changeUploading(true);
      const typeCheck = data.docs.filter((each: CallbackDoc) =>
        mimeTypes.includes(each.mimeType)
      );
      fetch(
        "https://drive.google.com/uc?export=drive&id=" + typeCheck[0].id,
        {
          method: "GET",
          mode: "no-cors",
        }
      ).then((response) => console.log(response.blob()));
      // saveAs(
      //   `https://drive.google.com/uc?export=download&id=${typeCheck[0].id}`,
      //   "name "
      // );

      const getTheRequiredData = typeCheck.map((data: CallbackDoc) => ({
        name: data.name,
        size: data.sizeBytes,
        location: "https://drive.google.com/uc?export=view&id=" + data.id,
        mimeType: data.mimeType,
      }));
      changeUploading(false);
      onUpload([...uploadedFiles, ...getTheRequiredData]);
      console.log(typeCheck[0]);
      handleOpen();
    } else if (data.action === "loaded") {
      handleClose();
    }
  };

  return (
    <div>
      {/* <button type="button" onClick={() => handleOpenPicker()}>
        Open Picker
      </button> */}
      <GooglePicker
        clientId={
          "976789947474-a3d4hteu14kc4ve10ue9500digrbe69j.apps.googleusercontent.com"
        }
        developerKey={"AIzaSyDn9U-rJaV-RdyJRXVIwaGwPwbRQWwC-gQ"}
        scope={[
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/drive.metadata",
        ]}
        onChange={(data: any) => callbackFunction(data)}
        onAuthenticate={(token: any) => setToken(token)}
        onAuthFailed={(data: any) => console.log("on auth failed:", data)}
        multiselect={true}
        navHidden={true}
        authImmediate={false}
        mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
        viewId={"DOCS"}>
        <div className="GoogleFileSelector-container">
          <img src={DriveImage} alt="drive" />
          <button type="button" className="btn btn-success">
            Choose From Drive
          </button>
        </div>
      </GooglePicker>
    </div>
  );
};
