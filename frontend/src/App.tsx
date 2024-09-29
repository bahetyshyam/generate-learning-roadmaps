import { useContext } from "react";
import { Main } from "./containers/main";
import LoginPage from "./components/login";
import { AppContext } from "./contexts/AppContext.tsx";

function App() {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("UserProfile must be used within an AppProvider");
  }
  const { userInfo } = appContext;

  return <>{userInfo ? <Main /> : <LoginPage />}</>;
}

export default App;
