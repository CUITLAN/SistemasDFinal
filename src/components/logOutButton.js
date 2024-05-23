import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <div>
      <button type="button" class="btn btn-outline-primary" onClick={() => logout()}>Log-out</button>
    </div>
  );
};

export default LogoutButton;
