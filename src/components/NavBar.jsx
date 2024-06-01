import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; 

import LoginButton from "./loginButton.js";
import LogoutButton from "./logOutButton.js";

const Navbar = ({ keyword, setKeyword, getTracks }) => {
  const { isAuthenticated } = useAuth0(); 
  
  // if (isLoading) {
  //   return <h1>Cargando...</h1>;//Mensaje de carga
  // }

  const handleSearch = () => {
    getTracks();
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{
      backgroundColor:'#539269'
    }}>
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
          <div style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#C3F73A" class="bi bi-file-music-fill" viewBox="0 0 16 16">
                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-.5 4.11v1.8l-2.5.5v5.09c0 .495-.301.883-.662 1.123C7.974 12.866 7.499 13 7 13s-.974-.134-1.338-.377C5.302 12.383 5 11.995 5 11.5s.301-.883.662-1.123C6.026 10.134 6.501 10 7 10c.356 0 .7.068 1 .196V4.41a1 1 0 0 1 .804-.98l1.5-.3a1 1 0 0 1 1.196.98"/>
              </svg>
            </div> 
            <div style={{
              paddingLeft: '5px'
            }}>
              <span className="navbar-brand" style={{
              color: '#1C1018'
              }}>
                Albumi
              </span>
            </div>
          </div>
          {isAuthenticated && (
            <div style={{ display:'flex' }}>
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                className="form-control me-2"
                type="search"
                placeholder="¡Escribe tu Artista!"
                aria-label="Search"
                style={{ width: '900px', height: '40px' }}
              />
              <button onClick={handleSearch} className="btn  me-2" type="button" style={{ backgroundColor: '#68B684', color: 'white' }}>
                Buscar
              </button>
            </div> 
          )}
          <div style={{display:'flex'}}>
            {isAuthenticated ? <LogoutButton /> :<LoginButton />}
          </div>
        </div>
      </div>
    </nav> 
  );
};

export default Navbar;
