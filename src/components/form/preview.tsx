import Image from "next/image";
import React from "react";

const Preview = ({ content }: any) => {
  const renderPreview = () => {
    if (content) {
      if (
        content.name.endsWith(".jpg") ||
        content.name.endsWith(".jpeg") ||
        content.name.endsWith(".png")
      ) {
        return (
          <Image
            className="mx-auto min-w-20 max-w-64 min-h-20 max-h-52 bg-gradient-to-tr from-[#ADE1FF] to-sky-400 rounded-lg object-cover shadow-lg"
            src={URL.createObjectURL(content)}
            alt="Preview"
            width={200}
            height={200}
          />
        );
      } else if (
        content.name.endsWith(".mp4") ||
        content.name.endsWith(".mov") ||
        content.name.endsWith(".avi")
      ) {
        return (
          <video
            className="mx-auto w-[20rem] h-[14rem] bg-gradient-to-tr from-[#ADE1FF] to-sky-400 rounded-lg object-cover shadow-lg"
            controls
            src={URL.createObjectURL(content)}
          />
        );
      } else if (content.name.endsWith(".pdf")) {
        return (
          <iframe
            className="mx-auto w-[18rem] h-[14rem] bg-gradient-to-tr from-[#ADE1FF] to-sky-400 rounded-lg object-cover shadow-lg"
            src={URL.createObjectURL(content)}
            title="Preview"
            width="400"
            height="300"
          ></iframe>
        );
      }
    }
    return (
      <Image
        className="mx-auto min-w-20 max-w-64 min-h-20 max-h-52 bg-gradient-to-tr from-[#ADE1FF] to-sky-400 rounded-lg object-cover shadow-lg"
        src={"/images/preview-icon.png"}
        alt="Preview"
        width={200}
        height={200}
      />
    );
  };

  return <div>{renderPreview()}</div>;
};

export default React.memo(Preview);
