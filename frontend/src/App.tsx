import { useContext } from "react";
import { Main } from "./containers/main";
import LoginPage from "./components/login";
import { AppContext } from "./contexts/AppContext.tsx";
import { RiLoader3Fill } from "react-icons/ri";

function App() {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("UserProfile must be used within an AppProvider");
  }
  const { userInfo, loading } = appContext;

  return (
    <>
      {userInfo ? <Main /> : <LoginPage />}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <RiLoader3Fill className="loader" />
        </div>
      )}
    </>
  );
}

export default App;
