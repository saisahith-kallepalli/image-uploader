import React from "react";
import { Button, Modal } from "react-bootstrap";
import localImage from "./../../images/desktop-solid.svg";
import driveImage from "./../../images/icons8-google-drive-color/icons8-google-drive-96.svg";
import dropboxImage from "./../../images/icons8-dropbox-color/icons8-dropbox-96.svg";
type Props = {
  show: boolean;
  handleClose: () => void;
  size: "sm" | "lg" | "xl" | undefined;
  header: string;
  mimeTypes: Array<string>;
  allowMultiple: boolean;
};

export const UniversalFileUploaderModal = (props: Props) => {
  const { show, handleClose, size, header, mimeTypes } = props;
  const selectionType: Array<any> = [
    {
      name: "localFileUpload",
      image: localImage,
      color: "#0074F5",
      title: "Local Files",
    },
    {
      name: "GoogleDriveUpload",
      image: driveImage,
      title: "Google Drive",
    },
    {
      name: "DropBoxUpload",
      image: dropboxImage,
      title: "Drop Box",
    },
  ];
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={size}
      animation={false}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-between">
        <div>type of selection</div>
        <div>select files</div>
        <div>selected files</div>
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
