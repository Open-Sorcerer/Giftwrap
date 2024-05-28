import React from "react";

interface IUpload {
  id: string;
  name: string;
  type?: string;
  accept?: string;
  label: string;
  onChange: (e: any) => void;
}

const Upload = ({ id, name, type, accept, label, onChange }: IUpload) => {
  return (
    <div className="flex flex-col font-primary mx-auto">
      <button className="p-0 w-[180px] d-block h-[40px] relative rounded-[10px] text-black bg-gray-200 border border-gray-200 hover:bg-gray-300 font-bold overflow-hidden hover:cursor-pointer">
        <div className="relative h-full flex items-center font-medium justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-neutral-700 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>{" "}
          {label}
        </div>
        <input
          id={id}
          name={name}
          type={type || "file"}
          className="absolute opacity-0 left-0 top-0 bottom-0 right-0 hover:cursor-pointer z-10"
          onChange={onChange}
          required
        />
      </button>
    </div>
  );
};

export default Upload;
