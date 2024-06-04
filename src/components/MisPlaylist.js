import React, { useState, useEffect } from 'react';

const MisPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const user_id = sessionStorage.getItem("user_id");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        console.log(`Fetching playlists for user ID: ${user_id}`);
        const response = await fetch(`http://localhost:3001/api/MyPlaylist/${user_id}`);
        if (!response.ok) {
          throw new Error('Error al obtener las playlists');
        }
        const data = await response.json();
        console.log('Playlists data:', data);
        setPlaylists(data.playlists);
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    };
    
    if (user_id) {
      fetchPlaylists();
    } else {
      console.log('No se encuentra el id ');
    }
  }, [user_id]);

  return (
    <div>
      <p>User ID: {user_id}</p>
      {/* Comentar esto cuando ya este funcionando al 100 mientras dejar para ubicarlo */}
      {playlists.map(playlist => (
        <div key={playlist.id} className="card w-75 mb-3">
          <div className="card-body">
            <h5 className="card-title">{playlist.name}</h5>
            <p className="card-text">ID: {playlist.id}</p>
            <p className="card-text">Fecha de Creación: {new Date(playlist.created_at).toLocaleDateString()}</p>
            <a href="#" className="btn btn-primary">Abrir Playlist</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MisPlaylist;
