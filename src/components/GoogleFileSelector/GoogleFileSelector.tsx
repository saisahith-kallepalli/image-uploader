import React, { useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import { CallbackDoc } from "react-google-drive-picker/dist/typeDefs";
import { useGoogleApi } from "react-gapi";
// import { downloadFile } from "../../download";
// import { saveAs } from "file-saver";
export type GoogleFileSelectorProps = {
  mimeTypes: Array<string>;
  handleOpen: () => void;
  handleClose: () => void;
  onUpload: (fileValues: Array<File>) => void;
  uploadedFiles: Array<File>;
};
const token =
  "ya29.a0AVA9y1sbVGVEmMdflrOCbNr2IU7yKeikIVQ3JfV1jZNQOYbehy6DBMFm_m9uzvPRjQRFb-Apsi16fwvVKyvErzKXohjFIx5Q7JHaet_nQTvcahMFJMddE3UpFOn_OkF8qhvSJh9kwMJe1f1YgTlNy4BrGbtXaCgYKATASAQASFQE65dr8v7GwjWQanEdrrPyZhV8x8w0163";
export const GoogleFileSelector = (props: GoogleFileSelectorProps) => {
  const gapi = useGoogleApi({
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ],
    scopes: ["https://www.googleapis.com/auth/drive.metadata.readonly"],
  });
  const { mimeTypes, handleOpen, handleClose } = props;
  const [openPicker, authResponse] = useDrivePicker();
  const [selectedFile, setSelectedFile] = useState<CallbackDoc[]>([]);
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "976789947474-a3d4hteu14kc4ve10ue9500digrbe69j.apps.googleusercontent.com",
      developerKey: "AIzaSyDn9U-rJaV-RdyJRXVIwaGwPwbRQWwC-gQ",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: false,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      viewMimeTypes: mimeTypes.join(","),
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          handleOpen();
          console.log("User clicked cancel/close button");
        } else if (data.action === "picked") {
          console.log(data.docs);
          const typeCheck = data.docs.filter((each: CallbackDoc) =>
            mimeTypes.includes(each.mimeType)
          );
          const getTheRequiredData = typeCheck.map((data: CallbackDoc) => ({
            name: data.name,
            size: 1002,
            location: data.url,
            mimeType: data.mimeType,
          }));
          console.log(data);
          // downloadFile(data.docs[0].id);
          // saveAs(
          //   `https://drive.google.com/uc?export=download&id=${typeCheck[0].id}`,
          //   "name "
          // );
          setSelectedFile(data.docs);
          handleOpen();
        } else if (data.action === "loaded") {
          handleClose();
        }
      },
    });
  };
  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);

  return (
    <div>
      <button type="button" onClick={() => handleOpenPicker()}>
        Open Picker
      </button>
      <img
        src={
          "https://drive.google.com/file/d/1nPvYfTvTRSvy99y9eBsSBn8Sd-kJz3tA/preview?usp=drive_web"
        }
        alt="drive"
      />
    </div>
  );
};
