import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { AuthUserData } from "../lib/types/auth";
import {
  getToken,
  getUserFromStorage,
  removeToken,
} from "../utils/localStorage";

interface AuthContextType {
  accessToken: string | null;
  user: AuthUserData | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: AuthUserData | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUserData | null>(null);

  useEffect(() => {
    const token = getToken();
    const localUserData = getUserFromStorage();
    if (token && localUserData) {
      setAccessToken(token);
      setUser(localUserData);
    }
  }, []);

  const logout = () => {
    removeToken();
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user, setAccessToken, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
