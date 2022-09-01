import React from "react";
import Badge from "react-bootstrap/Badge";
import "./ShowUploaded.scss";
import { MdClose } from "react-icons/md";
import { ProgressBar } from "react-bootstrap";
export type ShowUploadedProps = {
  uploadedFiles: Array<File>;
  onUpload: (fileValues: Array<File>) => void;
};

export const ShowUploaded = (props: ShowUploadedProps) => {
  const { uploadedFiles, onUpload } = props;

  const onClickRemoveFromSelected = (index: number) => {
    const UnRemovedFiles = uploadedFiles.filter(
      (each: File, indexEach: number) => index !== indexEach
    );
    onUpload(UnRemovedFiles);
  };
  return (
    <div className="show-uploaded-main-container">
      {uploadedFiles.map((each: File, index: number) => (
        <div key={each.name} className="show-uploaded-container">
          <img
            className="show-uploaded-image-size"
            src={URL.createObjectURL(each)}
            alt={each.name}
          />
          <div className="show-uploaded-box">
            <div className="show-uploaded-name-box">
              <h6 className="show-uploaded-font-fit ">{each.name}</h6>

              <MdClose
                className="show-uploaded-close"
                onClick={() => onClickRemoveFromSelected(index)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
