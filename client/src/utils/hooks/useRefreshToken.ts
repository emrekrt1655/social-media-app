import { useAuthContext } from "../../context/AuthContext";
const API_URL = "http://localhost:8000/api";

export const useRefreshToken = () => {
  const { setAccessToken, setUser } = useAuthContext();
  const refresh = async () => {
    const refreshFlag = localStorage.getItem("refresh");
    if (refreshFlag !== "soureSachen") {
      console.log("Refresh token guard prevented execution.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/refresh_token`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const data = await response.json();

      localStorage.setItem("accessToken", data.access_token);
      setAccessToken(data.access_token);
      setUser(data.user);

      return data;
    } catch (err) {
      console.error("Refresh token failed", err);
      throw err;
    }
  };

  return refresh;
};
