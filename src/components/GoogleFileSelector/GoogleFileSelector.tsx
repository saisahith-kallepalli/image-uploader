import React, { useEffect, useState } from "react";
import DriveImage from "./../../images/g-drive.png";
import GooglePicker from "react-google-picker";
import "./GoogleFileSelector.scss";
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

  /*
   *callbackFunction which is we used fro to get the selected file data from the drive source
   * used third party package called "react-google-picker"
   * developer will get clientId and developerKey will be available after creating project and credentials in developers console in google
   */
  const callbackFunction = async (data: any) => {
    if (data.action === "cancel") {
      handleOpen();
    } else if (data.action === "picked") {
      changeUploading(true);
      const typeCheck = data.docs.filter((each: any) =>
        mimeTypes.includes(each.mimeType)
      );
      console.log(data);

      const getTheRequiredData = typeCheck.map((data: any) => ({
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
      <GooglePicker
        clientId={
          "976789947474-a3d4hteu14kc4ve10ue9500digrbe69j.apps.googleusercontent.com"
        }
        developerKey={"AIzaSyDn9U-rJaV-RdyJRXVIwaGwPwbRQWwC-gQ"}
        scope={["https://www.googleapis.com/auth/drive"]}
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
