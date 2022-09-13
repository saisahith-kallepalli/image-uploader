import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import localImage from "./../../images/monitor.png";
import driveImage from "./../../images/g-drive.png";
import dropboxImage from "./../../images/Group 1.png";
import { UploadTypes } from "../UploadTypes";
import "./UniversalFileUploaderModal.scss";
import { LocalFileUploader } from "../LocalFileUploader";
import { ShowUploaded } from "../ShowUploaded";
import { GoogleFileSelector } from "../GoogleFileSelector";
import { DropboxFileSelector } from "../DropboxFileSelector";
export type UniversalFileUploaderProps = {
  show: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  size: "sm" | "lg" | "xl" | undefined;
  header: string;
  mimeTypes: Array<string>;
  allowMultiple: boolean;
  onUpload: (fileValues: Array<any>) => void;
  uploadedFiles: Array<any>;
};

export const UniversalFileUploaderModal = (
  props: UniversalFileUploaderProps
) => {
  const {
    show,
    handleClose,
    handleOpen,
    size,
    header,
    mimeTypes,
    allowMultiple,
    onUpload,
    uploadedFiles,
  } = props;
  const [typeOfUpload, setTypeOfUpload] = useState<string>("localFileUpload");
  const [uploading, setUploading] = useState<boolean>(false);
  const changeUploading = (load: boolean) => {
    setUploading(load);
  };

  const selectionType: Array<{
    type: string;
    image: any;
    color?: string;
    title: string;
  }> = [
    {
      type: "localFileUpload",
      image: localImage,
      color: "#0074F5",
      title: "Local Files",
    },
    {
      type: "GoogleDriveUpload",
      image: driveImage,
      title: "Google Drive",
    },
    {
      type: "DropBoxUpload",
      image: dropboxImage,
      title: "Drop Box",
    },
  ];

  // By click on type of uploading it will setTypeOfUpload the type according to top Object "SelectionType"
  const onClickChangeTypeOfUpload = (type: string) => {
    setTypeOfUpload(type);
  };
  const closeModel = () => {
    handleClose();
    onUpload([]);
  };
  return (
    <Modal
      show={show}
      onHide={closeModel}
      size={size}
      animation={false}
      backdrop="static"
      dialogClassName="UniversalFileUploaderModel-model"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-between UniversalFileUploaderModel-body">
        <div className="UniversalFileUploaderModel-type-select ">
          <UploadTypes
            selectionType={selectionType}
            onClickChangeTypeOfUpload={onClickChangeTypeOfUpload}
            typeOfUpload={typeOfUpload}
          />
        </div>
        <div className="UniversalFileUploaderModel-selection-file">
          {typeOfUpload === "localFileUpload" ? (
            <LocalFileUploader
              allowMultiple={allowMultiple}
              onUpload={onUpload}
              mimeTypes={mimeTypes}
              uploadedFiles={uploadedFiles}
            />
          ) : typeOfUpload === "GoogleDriveUpload" ? (
            <GoogleFileSelector
              allowMultiple={allowMultiple}
              mimeTypes={mimeTypes}
              handleOpen={handleOpen}
              handleClose={handleClose}
              onUpload={onUpload}
              uploadedFiles={uploadedFiles}
              changeUploading={changeUploading}
            />
          ) : typeOfUpload === "DropBoxUpload" ? (
            <DropboxFileSelector
              allowMultiple={allowMultiple}
              onUpload={onUpload}
              uploadedFiles={uploadedFiles}
              changeUploading={changeUploading}
            />
          ) : (
            ""
          )}
        </div>
        <div className="UniversalFileUploaderModel-show-file">
          <ShowUploaded
            uploadedFiles={uploadedFiles}
            onUpload={onUpload}
            uploading={uploading}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModel}>
          Close
        </Button>
        <Button variant="success">Done</Button>
      </Modal.Footer>
    </Modal>
  );
};
UniversalFileUploaderModal.defaultProps = {
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
  disabled: false,
  size: "xl",
};
