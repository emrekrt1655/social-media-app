import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useAuthMutation } from "../../lib/hooks/useAuth";
import "./Login.scss";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { login } = useAuthMutation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please provide email or password");

      return;
    }
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error: any) => {
          const message = error?.message || "Email or Password is wrong!";
          setErrorMessage(message);
        },
      }
    );
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const isClickInsideInputs =
        emailRef?.current?.contains(target) ||
        passwordRef?.current?.contains(target);

      if (
        isClickInsideInputs ||
        document.activeElement === emailRef.current ||
        document.activeElement === passwordRef.current
      ) {
        return;
      }

      if (!email.trim()) {
        emailRef?.current?.focus();
      } else {
        passwordRef.current?.focus();
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [email]);

  return (
    <div className="login-wrapper">
      <div className="login-image">
        <img
          src="https://images.pexels.com/photos/30775234/pexels-photo-30775234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Login Illustration"
        />
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Password"
            />
          </div>

          {errorMessage && <div className="form-error">{errorMessage}</div>}
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
