import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => {
          loginWithRedirect({
            appState: {
              returnTo: "http://localhost:3000",
            },
            
          });
        }
      
      }
      >
        Login
      </button>
    </div>
  );
};

export default LoginButton;
