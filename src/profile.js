import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      // Enviar los datos del usuario al backend
      console.log("Se envio el usuario");
      fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auth0_id: user.sub,
          name: user.name,
          email: user.email,
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Usuario registrado:', data);
      })
      .catch(error => {
        console.error('Error al registrar el usuario:', error);
      });
    }
  }, [isAuthenticated, user]);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.sub}</p>
      </div>
    )
  );
};

export default Profile;
