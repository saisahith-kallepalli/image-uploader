import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import localImage from "./../../images/desktop-solid.svg";
import driveImage from "./../../images/icons8-google-drive-color/icons8-google-drive-96.svg";
import dropboxImage from "./../../images/icons8-dropbox-color/icons8-dropbox-96.svg";
import { UploadTypes } from "../UploadTypes";
import "./UniversalFileUploaderModal.scss";
import { LocalFileUploader } from "../LocalFileUploader";
import { ShowUploaded } from "../ShowUploaded";
import { GoogleFileSelector } from "../GoogleFileSelector";
type Props = {
  show: boolean;
  handleClose: () => void;
  size: "sm" | "lg" | "xl" | undefined;
  header: string;
  mimeTypes: Array<string>;
  allowMultiple: boolean;
  onUpload: (fileValues: Array<File>) => void;
  uploadedFiles: Array<File>;
};

export const UniversalFileUploaderModal = (props: Props) => {
  const {
    show,
    handleClose,
    size,
    header,
    mimeTypes,
    onUpload,
    uploadedFiles,
  } = props;
  const [typeOfUpload, setTypeOfUpload] =
    React.useState<string>("localFileUpload");
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
  const onClickChangeTypeOfUpload = (type: string) => {
    setTypeOfUpload(type);
  };

  //change the file
  console.log(uploadedFiles);
  // stop page reload

  // handle drag events

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={size}
      animation={false}
      backdrop="static"
      dialogClassName="UniversalFileUploaderModel-model"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-between">
        <div className="UniversalFileUploaderModel-type-select ">
          <UploadTypes
            selectionType={selectionType}
            onClickChangeTypeOfUpload={onClickChangeTypeOfUpload}
          />
        </div>
        <div className="w-50 h-100">
          {/* <LocalFileUploader onUpload={onUpload} mimeTypes={mimeTypes} /> */}
          <GoogleFileSelector />
        </div>
        <div className="w-25">
          <ShowUploaded uploadedFiles={uploadedFiles} />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Done</Button>
      </Modal.Footer>
    </Modal>
  );
};
