import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthMutation } from "../../lib/hooks/useAuth";

const Active: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { active } = useAuthMutation();
  useEffect(() => {
    const token = location.pathname.split("/active/")[1];

    if (token) {
      active(token, {
        onSuccess: () => navigate("/login"),
      });
    }
  }, [location, navigate]);

  return <div>Activating account...</div>;
};

export default Active;
