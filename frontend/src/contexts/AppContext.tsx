import { createContext, useState, useEffect, ReactNode, FC } from "react";

// Define a type for the user information
interface UserInfo {
  username: string;
}

// Define the context type
interface AppContextType {
  userInfo: UserInfo | null;
  login: (username: string) => void;
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

  // Effect to update localStorage whenever userInfo changes
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [userInfo]);

  // Function to handle user login
  const login = (username: string) => {
    setUserInfo({ username });
  };

  // Function to handle user logout
  const logout = () => {
    setUserInfo(null);
  };

  return (
    <AppContext.Provider value={{ userInfo, login, logout }}>
      {ReactNode}
    </AppContext.Provider>
  );
};
