import { authService, dbService } from "fbInstance";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyYweets = async () => {
    const yweets = await dbService
      .collection("yweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();

    console.log(yweets.docs.map((doc) => doc.data()));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  useEffect(() => {
    getMyYweets();
  }, []);

  return (
    <div className="profile">
      <form onSubmit={onSubmit} className="profile-form">
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
          className="input-round yweet-edit-input"
        />
        <input
          type="submit"
          value="Update Profile"
          className="input-round yweet-edit-button bg-blue"
        />
        <div className="white-line" />
        <button
          onClick={onLogOutClick}
          className="input-round yweet-edit-button bg-red"
        >
          Log Out
        </button>
      </form>
    </div>
  );
};

export default Profile;
