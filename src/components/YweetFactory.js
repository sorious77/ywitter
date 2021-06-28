import { useState } from "react";
import { dbService, storageService } from "fbInstance";
import { v4 as uuidv4 } from "uuid";

const YweetFactory = ({ userObj }) => {
  const [yweetText, setYweetText] = useState("");
  const [upload, setUpload] = useState("");

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setYweetText(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const image = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setUpload(result);
    };

    reader.readAsDataURL(image);
  };

  const onClearImageClick = () => {
    setUpload("");
  };

  const curTime = () => {
    const date = new Date();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const i = date.getMinutes();
    return (
      (date.getFullYear() % 100) +
      "-" +
      (m > 9 ? m : "0" + m) +
      "-" +
      (d > 9 ? d : "0" + d) +
      " " +
      (h > 9 ? h : "0" + h) +
      ":" +
      (i > 9 ? i : "0" + i)
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    let fileURL = "";
    if (upload !== "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(upload, "data_url");
      fileURL = await response.ref.getDownloadURL();
    }

    const name = userObj.displayName?.length
      ? userObj.displayName
      : "anonymous";

    const yweet = {
      text: yweetText,
      creatorId: userObj.uid,
      creatorName: name,
      createdAt: curTime(),
      fileURL,
    };
    await dbService.collection("yweets").add(yweet);
    setYweetText("");
    setUpload("");
  };

  return (
    <div className="yweet-form">
      <form onSubmit={onSubmit}>
        <input
          value={yweetText}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          className="yweet-input-text input-round"
        />
        <input type="submit" value="→" className="yweet-input-submit" />
        <br />
        <label htmlFor="upload-image" className="yweet-input-file-label">
          Add photos +
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          id="upload-image"
          className="yweet-input-file"
        />
        <br />
        {upload && (
          <>
            <img
              src={upload}
              width="50px"
              height="50px"
              alt="upload"
              className="yweet-upload-image"
            />
            <br />
            <button
              onClick={onClearImageClick}
              className="yweet-image-clear-button"
            >
              Remove ✕
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default YweetFactory;
