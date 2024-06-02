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
      <div style={{
        display:'flex',
        flexDirection:'row', 
        alignItems: 'center'
      }}>
        <div style={{
          margin: '5px',
          display: 'flex', 
          alignItems: 'center',
          marginRight: '10px',
          height: '80px'
        }}>
          <img src={user.picture} alt={user.name} style={{
            borderRadius: '50%',
            width: '55px',
            height: '55px'
          }}/>
        </div>
        <div style={{
          height: '100px',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column', 
          marginRight: '10px'
        }}>
          <h3 style={{
            fontSize:'12px',
            fontWeight: 'bold'
          }}
          >{user.name}</h3>
          <p style={{
            fontSize: '10px'
          }}
          >{user.email}</p>
        </div>
      </div>
    )
  );
};

export default Profile;
