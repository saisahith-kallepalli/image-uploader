import React, { useEffect, useState } from "react";
import "./ShowUploaded.scss";
import { MdClose } from "react-icons/md";
import NoFileImage from "./../../images/file.png";
import ImageLoading from "./../../images/Group 5.png";
import { ProgressBarLoading } from "../StyledComponents";
export type ShowUploadedProps = {
  uploadedFiles: Array<any>;
  onUpload: (fileValues: Array<any>) => void;
  uploading: boolean;
};
//* ProgressBarLoading is a StyledComponent which was designed by using third party libraries

// *it will show the uploaded files list  And onUpload for removing the canceled files to uploadedFiles

export const ShowUploaded = (props: ShowUploadedProps) => {
  const { uploadedFiles, onUpload, uploading } = props;
  const [inter, setInter] = useState(0);
  const [number, setNumber] = useState(0);

  //*Removing the files by clicking on "X" Button
  const onClickRemoveFromSelected = (index: number) => {
    const UnRemovedFiles = uploadedFiles.filter(
      (each: any, indexEach: number) => index !== indexEach
    );
    onUpload(UnRemovedFiles);
  };

  //* this useEffect fro the progress bar
  useEffect(() => {
    if (uploading) {
      let name: any = setInterval(
        () => setNumber((prev: number) => (prev < 90 ? prev + 10 : 90)),
        200
      );
      setInter(name);
    } else {
      clearInterval(inter);
      setInter(0);
      setNumber(0);
    }
  }, [uploading]);

  return (
    <div className="show-uploaded-main-container">
      <h4>Selected files ({uploadedFiles.length})</h4>
      <div className="show-uploaded-scrolling">
        {uploadedFiles.length < 1 && !uploading && (
          <div className="show-uploaded-noImage-Container">
            <img src={NoFileImage} alt="No Images Selected" />
            <p>No file is selected</p>
          </div>
        )}
        {}
        {uploadedFiles.map((each: any, index: number) => (
          <div key={each.id || each.name} className="show-uploaded-container">
            {each.location ? (
              <img
                className="show-uploaded-image-size"
                src={each.location}
                alt={each.name}
              />
            ) : (
              <img
                className="show-uploaded-image-size"
                src={URL.createObjectURL(each)}
                alt={each.name}
              />
            )}
            <div className="show-uploaded-box">
              <div className="show-uploaded-name-box">
                <h6 className="show-uploaded-font-fit ">
                  {each.name.split(".")[0].slice(0, 10) +
                    "." +
                    each.name.split(".")[1]}
                </h6>

                <MdClose
                  className="show-uploaded-close"
                  onClick={() => {
                    onClickRemoveFromSelected(index);
                  }}
                />
              </div>
              <div className="show-uploaded-progressBar ">
                <ProgressBarLoading color="#08A742" number={100} />
              </div>
              <div className="show-uploaded-size-and-percentage">
                <p>{(each.size / (1024 * 1024)).toFixed(2)} MB</p>
                <p>completed</p>
              </div>
            </div>
          </div>
        ))}
        {uploading && (
          <div className="show-uploaded-container">
            <div className="show-uploaded-noImage">
              {}
              <img
                className="show-uploaded-progressImage-size"
                src={ImageLoading}
                alt="uploading"
              />
            </div>

            <div className="show-uploaded-box">
              <div className="show-uploaded-name-box">
                <h6 className="show-uploaded-font-fit ">image</h6>
              </div>
              <div className="show-uploaded-progressBar ">
                <ProgressBarLoading color="#08A742" number={number} />
              </div>
              <div className="show-uploaded-size-and-percentage">
                <p>{}</p>
                <p>{number}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
