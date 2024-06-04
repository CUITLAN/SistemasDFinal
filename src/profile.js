import React, { useEffect, useState, createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
const UserContext = createContext();

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const registerAndFetchUserId = async () => {
      if (isAuthenticated) {
        try {
          // Registrar el usuario
          const registerResponse = await fetch('http://localhost:3001/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              auth0_id: user.sub,
              name: user.name,
              email: user.email,
              }),
            }
          );

          if (!registerResponse.ok) {
            throw new Error(`HTTP error! status: ${registerResponse.status}`);
          }

          const registerData = await registerResponse.json();
          console.log('Usuario registrado:', registerData);

          // Obtener el user_id basado en el auth0_id
          const userResponse = await fetch(`http://localhost:3001/api/MyUser/${user.sub}`);

          if (!userResponse.ok) {
            throw new Error(`HTTP error! status: ${userResponse.status}`);
          }

          const userData = await userResponse.json();
          console.log("User data:", userData);
          setUserId(userData.id); //Este es el User_id Asi se usara en otras peticiones
        } catch (error) {
          console.error("Error al procesar la solicitud:", error);
        }
      }
    };
    registerAndFetchUserId();
  }, [isAuthenticated, user]);

  // Se guarda el user id hasta que está disponible de la respuesta a la api
  useEffect(() => {
    if (userId) {
      sessionStorage.setItem("user_id", userId);
      console.log("user id guardado: ", userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={userId}>
      {isAuthenticated && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              margin: "5px",
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
              height: "80px",
            }}
          >
            <img
              src={user.picture}
              alt={user.name}
              style={{ borderRadius: "50%", width: "55px", height: "55px" }}
            />
          </div>
          <div
            style={{
              height: "100px",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              marginRight: "10px",
            }}
          >
            <h3 style={{ fontSize: "12px", fontWeight: "bold" }}>
              {user.name}
            </h3>
            <p style={{ fontSize: "10px" }}>{user.email}</p>
            <p>{`User ID: ${userId}` }</p>
            
          </div>
          <Link to={'/MyPlaylist'}>
          <button type="button" class="btn btn-success">Mis PLaylist</button>
          {/* Se que esto esta mal acomodado Nelly No me mates estoy aprendiendo   ahorita por la crisis ya como caiga */}
          </Link>
        </div>
      )}
    </UserContext.Provider>
  );
};

export const useUserId = () => useContext(UserContext);

export default Profile;
