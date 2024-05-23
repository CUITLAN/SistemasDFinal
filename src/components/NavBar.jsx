import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; 

import LoginButton from "./loginButton.js";
import LogoutButton from "./logOutButton.js";

const Navbar = ({ keyword, setKeyword, getTracks }) => {
  const { isAuthenticated, isLoading } = useAuth0(); 
  
  if (isLoading) {
    return <h1>Cargando...</h1>;//Mensaje de carga
  }

  const handleSearch = () => {
    getTracks();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01" style={{justifyContent:'space-around'}}>
          <span className="navbar-brand">Albumi</span>
          <div style={{display:'flex'}}>
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="form-control me-2"
              type="search"
              placeholder="¡Escribe tu Artista!"
              aria-label="Search"
              style={{ width: '900px', height: '40px' }}
            />
            <button onClick={handleSearch} className="btn btn-outline-success me-2" type="button">
              Buscar
            </button>
          </div>
          <div style={{display:'flex'}}>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
