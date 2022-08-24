import React from "react";

type Props = {
  selectionType: Array<{
    name: string;
    image: any;
    color?: string;
    title: string;
  }>;
};

export const UploadTypes = (props: Props) => {
  const { selectionType } = props;
  return (
    <div>
      {selectionType.map((item, index) => {
        return (
          <div key={item.name}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
};
