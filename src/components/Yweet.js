import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fbInstance";
import React, { useState } from "react";

const Yweet = ({ yweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newYweet, setNewYweet] = useState(yweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to delete this Yweet?");

    if (ok) {
      await dbService.doc(`yweets/${yweetObj.id}`).delete();
      await storageService.refFromURL(yweetObj.fileURL).delete();
    } else {
      console.log("false");
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.doc(`yweets/${yweetObj.id}`).update({ text: newYweet });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewYweet(value);
  };

  return (
    <div className="yweet">
      {editing ? (
        <div>
          <form onSubmit={onSubmit} className="yweet-edit-form">
            <input
              type="text"
              placeholder="Edit your Yweet"
              onChange={onChange}
              value={newYweet}
              className="input-round yweet-edit-input border-black"
              required
            />
            <input
              type="submit"
              value="Update Yweet"
              className="input-round yweet-edit-button bg-blue"
            />
            <button
              onClick={toggleEditing}
              className="input-round yweet-edit-button bg-red"
            >
              Cancle
            </button>
          </form>
        </div>
      ) : (
        <>
          {yweetObj.fileURL && (
            <img
              src={yweetObj.fileURL}
              alt="cannot get"
              className="yweet-image"
            />
          )}
          <h3>{yweetObj.creatorName}</h3>
          <h4>{yweetObj.text}</h4>
          {isOwner ? (
            <div className="yweet-button">
              <button onClick={onDeleteClick} className="yweet-button-item">
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={toggleEditing} className="yweet-button-item">
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Yweet;
