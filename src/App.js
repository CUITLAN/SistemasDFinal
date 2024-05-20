import "./App.css";
import LoginButton from "./components/loginButton.js";
import LogoutButton from "./components/logOutButton.js";
import Profile from "./profile.js";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <h1>Is Loading</h1>
  }

  return (
    <div className="App">
      <h1>Pagina de Inicio</h1>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <Profile />
    </div>
  );
}

export default App;
 