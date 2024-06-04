import React, { useState, useEffect } from 'react';

const MisPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const user_id = sessionStorage.getItem("user_id");

  useEffect(() => {
    // Hola yo te enseño las playlist
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
  // Hola yo borro la playlist
  const eliminarPlaylist = async (playlist_id) => {
    try {
      const response = await fetch('http://localhost:3001/api/DeletePlaylist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: playlist_id })
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la playlist');
      }
      const data = await response.json();
      console.log(data.message); // Mensaje de éxito o error de la API
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar la playlist:', error.message);
    }
  };
  // hola yo creo la playlist
  const agregarPlaylist = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/AddPlaylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Name: newPlaylistName, user_id: user_id })
      });
      if (!response.ok) {
        throw new Error('Error al agregar la playlist');
      }
      const data = await response.json();
      console.log(data.message); // Mensaje de éxito o error de la API
      window.location.reload();
    } catch (error) {
      console.error('Error al agregar la playlist:', error.message);
    }
  };
  return (
    <div>
      <p>User ID: {user_id}</p>
      <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Crear nueva Playlist</button>
      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Nueva Playlist</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="playlist-name" className="col-form-label">¿Cómo se llamará tu nueva playlist?</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="playlist-name" 
                    value={newPlaylistName} 
                    onChange={(e) => setNewPlaylistName(e.target.value)} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={agregarPlaylist}>Crear</button>
            </div>
          </div>
        </div>
      </div>
  
      {playlists.map(playlist => (
        <div key={playlist.id} className="card w-75 mb-3">
          <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" style={{ background: 'none', border: 'none', padding: '0', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${playlist.id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-x-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M6.854 5.146a.5.5 0 1 0-.708.708L7.293 7 6.146 8.146a.5.5 0 1 0 .708.708L8 7.707l1.146 1.147a.5.5 0 1 0 .708-.708L8.707 7l1.147-1.146a.5.5 0 0 0-.708-.708L8 6.293z"/>
                </svg>
              </button>
            </div>
            <div className="modal fade" id={`staticBackdrop-${playlist.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel-${playlist.id}`} aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id={`staticBackdropLabel-${playlist.id}`}>Eliminaras la Playlist</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    La playlist junto con todas sus canciones Desapareceran ¿Estas seguro de Querer Eliminarla?
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" onClick={() => eliminarPlaylist(playlist.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
            <h5 className="card-title">{playlist.name}</h5>
            <p className="card-text">Playlist_id: {playlist.id}</p>
            <p className="card-text">Fecha de Creación: {new Date(playlist.created_at).toLocaleDateString()}</p>
            <a href="#" className="btn btn-primary">Abrir Playlist</a>
          </div>
        </div>
      ))}
    </div>
  );
}
export default MisPlaylist;
