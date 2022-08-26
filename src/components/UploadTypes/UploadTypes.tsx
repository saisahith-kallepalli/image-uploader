import React from "react";
import "./UploadTypes.scss";
type Props = {
  selectionType: Array<{
    type: string;
    image: any;
    color?: string;
    title: string;
  }>;
  onClickChangeTypeOfUpload: (type: string) => void;
};

export const UploadTypes = (props: Props) => {
  const { selectionType, onClickChangeTypeOfUpload } = props;
  return (
    <div className="d-flex flex-column">
      {selectionType.map((item, index) => {
        return (
          <div
            key={item.type}
            onClick={() => onClickChangeTypeOfUpload(item.type)}
            className="btn">
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
