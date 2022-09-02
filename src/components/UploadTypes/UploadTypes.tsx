import React from "react";
import "./UploadTypes.scss";
type Props = {
  selectionType: Array<{
    type: string;
    image: any;
    color?: string;
    title: string;
  }>;
  typeOfUpload: string;
  onClickChangeTypeOfUpload: (type: string) => void;
};

export const UploadTypes = (props: Props) => {
  const { selectionType, onClickChangeTypeOfUpload, typeOfUpload } = props;
  
  return (
    <div className="upload-type-container ">
      {selectionType.map((item, index) => {
        return (
          <div
            key={item.type}
            onClick={() => onClickChangeTypeOfUpload(item.type)}
            className={`${
              typeOfUpload === item.type
                ? "upload-type-background-color"
                : "upload-type-background-color-normal"
            }`}>
            <img
              src={item.image}
              alt={item.title}
              className="upload-type-image-size"
            />
            <p>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
};
