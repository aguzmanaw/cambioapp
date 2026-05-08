import { useDropzone } from "react-dropzone";
import { FileIconStatus } from "./FileIconStatus";
import { MAX_FILE_SIZE, MAX_FILE_COUNT } from "@/utils/constants";

export default function Upload({ id, name, filename, disabled = false }) {
  const props = disabled
    ? {
        noClick: true,
        noKeyboard: true,
      }
    : {};
  /*
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "application/pdf": [".pdf"],
    },
    */
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: MAX_FILE_COUNT,
      maxSize: MAX_FILE_SIZE,
      ...props,
    });

  const actionStatus = acceptedFiles.length
    ? "success"
    : fileRejections.length
    ? "error"
    : filename
    ? "none"
    : "info";

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input
          id={id}
          name={name}
          className="input-zone"
          {...getInputProps()}
        />
        <div className="text-center">
          <div className="dropzone-content" style={{ textAlign: "center" }}>
            <FileIconStatus action={actionStatus} />
          </div>
        </div>
      </div>
    </section>
  );
}
