import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { login as loginApi } from "../api";
import { RoadMapSummary } from "../types";

// Define a type for the user information
interface UserInfo {
  userId: number;
}

// Define the context type
interface AppContextType {
  userInfo: UserInfo | null;
  login: (username: string, password: string) => Promise<void>;
  recentRoadMaps: RoadMapSummary[];
  setRecentRoadMaps: Dispatch<SetStateAction<RoadMapSummary[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}

// Create a Context with a default value
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a Provider component
export const AppProvider: FC<{ children: ReactNode }> = ({
  children: ReactNode,
}) => {
  // Get initial state from localStorage or set to null
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  const { userId } = userInfo || {};

  const [recentRoadMaps, setRecentRoadMaps] = useState<RoadMapSummary[]>(() => {
    if (userId) {
      const storedRms = localStorage.getItem(userId.toString());
      return storedRms ? JSON.parse(storedRms) : null;
    }
    return null;
  });

  // Effect to update localStorage whenever userInfo changes
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [userInfo]);

  // Function to handle user login
  const login = async (username: string, password: string) => {
    const res = await loginApi(username, password);
    if (res) {
      setUserInfo({ userId: res });
    }
  };

  // Function to handle user logout
  const logout = () => {
    userInfo?.userId && localStorage.removeItem(userInfo.userId.toString());
    setUserInfo(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <AppContext.Provider
      value={{
        userInfo,
        login,
        logout,
        recentRoadMaps,
        setRecentRoadMaps,
        loading,
        setLoading,
      }}
    >
      {ReactNode}
    </AppContext.Provider>
  );
};
