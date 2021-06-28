import { useState } from "react";
import { authService } from "fbInstance";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let data = "";

    try {
      if (newAccount) {
        // create Account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // Log In
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
    console.log(data);
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
    setError("");
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="auth-form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="input-round input-gray"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="input-round input-gray"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
          className="input-round input-blue login-btn"
        />
        <div className="error-msg">{error}</div>
      </form>
      <span onClick={toggleAccount} className="auth-select-mode">
        {newAccount ? "Sign in" : "Create Account"}
      </span>
    </div>
  );
};

export default AuthForm;
