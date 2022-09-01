import React, { useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import { CallbackDoc } from "react-google-drive-picker/dist/typeDefs";
import { useGoogleApi } from "react-gapi";
import DriveImage from "./../../images/icons8-google-drive-color/icons8-google-drive-144.svg";
import GooglePicker from "react-google-picker";
import axios from "axios";
import "./GoogleFileSelector.scss";
// import { downloadFile } from "../../download";
// import { saveAs } from "file-saver";
export type GoogleFileSelectorProps = {
  mimeTypes: Array<string>;
  handleOpen: () => void;
  handleClose: () => void;
  onUpload: (fileValues: Array<File>) => void;
  uploadedFiles: Array<File>;
};
export const GoogleFileSelector = (props: GoogleFileSelectorProps) => {
  const [token, setToken] = useState("");
  const gapi = useGoogleApi({
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ],
    scopes: [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.metadata",
    ],
  });
  const { mimeTypes, handleOpen, handleClose, onUpload } = props;
  const callbackFunction = async (data: any) => {
    if (data.action === "cancel") {
      handleOpen();
      console.log("User clicked cancel/close button");
    } else if (data.action === "picked") {
      const response = await fetch(
        "https://www.googleapis.com/drive/v3/files/" + data.docs[0].id + ".jpg"
      );
      const getData = response.json();
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
        onAuthenticate={(token: any) =>
          console.log("oauth token:", setToken(token))
        }
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
