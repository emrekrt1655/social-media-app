import React, { useState, useRef, useEffect, FormEvent } from "react";
import { useAuthMutation } from "../../lib/hooks/useAuth";
import { SignupData } from "../../lib/types/auth";
import "./Register.scss";

const Register: React.FC = () => {
  const { register } = useAuthMutation();

  const [formData, setFormData] = useState<SignupData>({
    userName: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  // Refs for each input field
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const surnameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const hasEmptyField = Object.values(formData).some((val) => !val.trim());
    if (hasEmptyField) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    register(formData, {
      onSuccess: (data) => {
        setErrorMessage(data.message);
      },
      onError: (error) => {
        setErrorMessage(error?.message);
      },
    });
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const refs = [userNameRef, nameRef, surnameRef, emailRef, passwordRef];

      const isClickInsideInputs = refs.some((ref) =>
        ref.current?.contains(target)
      );

      const isAlreadyFocused = refs.some(
        (ref) => document.activeElement === ref.current
      );

      if (isClickInsideInputs || isAlreadyFocused) return;

      for (const ref of refs) {
        const name = ref.current?.name as keyof SignupData;
        if (ref.current && !formData[name].trim()) {
          ref.current.focus();
          break;
        }
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [formData]);

  return (
    <div className="register-wrapper">
      <div className="register-image">
        <img
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Register Illustration"
        />
      </div>
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="register-title">Register</h2>

          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              ref={userNameRef}
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="form-input"
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              ref={nameRef}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Your first name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Last Name</label>
            <input
              ref={surnameRef}
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="form-input"
              placeholder="Your last name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Create a password"
              required
            />
          </div>

          {errorMessage && <div className="form-error">{errorMessage}</div>}

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
