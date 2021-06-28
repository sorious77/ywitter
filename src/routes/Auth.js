import React from "react";
import { authService, fireBaseInstance } from "fbInstance";
import AuthForm from "components/AuthForm";
import {
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/*
	로그인/회원가입을 수행하는 페이지
	newAccount가 true라면 회원가입, false라면 로그인을 수행
*/

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;

    if (name === "google") {
      provider = new fireBaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new fireBaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div className="auth">
      <FontAwesomeIcon icon={faTwitter} className="main-logo" />
      <AuthForm />
      <div className="social-login">
        <button
          name="google"
          onClick={onSocialClick}
          className="input-round input-round-sm"
        >
          Continue with Google
          <FontAwesomeIcon icon={faGoogle} className="font-awesome" />
        </button>
        <button
          name="github"
          onClick={onSocialClick}
          className="input-round input-round-sm"
        >
          Continue with GitHub
          <FontAwesomeIcon icon={faGithub} className="font-awesome" />
        </button>
      </div>
    </div>
  );
};

export default Auth;
