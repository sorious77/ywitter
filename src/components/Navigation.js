import React from "react";
import { Link } from "react-router-dom";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
  return (
    <div className="nav">
      <ul className="nav-ul">
        <li className="nav-item">
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} className="menu-logo" />
          </Link>
        </li>
        <li className="nav-item ">
          <Link to="/profile" className="nav-item-profile">
            <FontAwesomeIcon icon={faUser} className="menu-logo" />
            <span className="">
              {userObj?.displayName?.length
                ? `${userObj.displayName}'s Profile`
                : "Profile"}
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
