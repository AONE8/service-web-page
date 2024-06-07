import { useState } from "react";
import fileUploaderClasses from "./FileUploader.module.css";
import { useRef } from "react";

export default function FileUploader({ label, file, setFile, ...props }) {
  const fileRef = useRef();

  function handleFileUpload(event) {
    fileRef.current.click();
  }

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (file) {
      return setFile(file);
    }

    setFile(null);
  }

  return (
    <div className={fileUploaderClasses["file-uploader"]}>
      <input {...props} ref={fileRef} onChange={handleFileChange} />
      <label htmlFor={props.id}>{label}</label>
      <button type="button" onClick={handleFileUpload}>
        Завантажити файл
      </button>
      <p>{file ? file.name : "Файл не обрано"}</p>
    </div>
  );
}
