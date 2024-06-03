import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <div>
      <button type="button" 
      style={{
        backgroundColor:'#094D92',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 20px',
        
      }}
      //className="btn btn-outline-primary" 
      onClick={() => logout()}>
        Log-out
      </button>
    </div>
  );
};

export default LogoutButton;
