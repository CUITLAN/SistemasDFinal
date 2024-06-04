import React, { useState, useEffect } from "react";

const MisPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [songs, setSongs] = useState({});
  const user_id = sessionStorage.getItem("user_id");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        console.log(`Fetching playlists for user ID: ${user_id}`);
        const response = await fetch(
          `http://localhost:3001/api/MyPlaylist/${user_id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener las playlists");
        }
        const data = await response.json();
        console.log("Playlists data:", data);
        setPlaylists(data.playlists);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    if (user_id) {
      fetchPlaylists();
    } else {
      console.log("No se encuentra el id");
    }
  }, [user_id]);

  const eliminarPlaylist = async (playlist_id) => {
    try {
      const response = await fetch("http://localhost:3001/api/DeletePlaylist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: playlist_id }),
      });
      if (!response.ok) {
        throw new Error("Error al eliminar la playlist");
      }
      const data = await response.json();
      console.log(data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar la playlist:", error.message);
    }
  };

  const agregarPlaylist = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/AddPlaylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: newPlaylistName, user_id: user_id }),
      });
      if (!response.ok) {
        throw new Error("Error al agregar la playlist");
      }
      const data = await response.json();
      console.log(data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar la playlist:", error.message);
    }
  };

  const fetchSongs = async (playlist_id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/GetSong/${playlist_id}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener las canciones");
      }
      const data = await response.json();
      console.log("Songs data:", data);
      setSongs((prevState) => ({ ...prevState, [playlist_id]: data.songs }));
    } catch (error) {
      console.error("Error al obtener las canciones:", error.message);
    }
  };
    const deleteSongs = async (song, playlist)=>{
      const bodyyy = {id: song.id, playlist_id: playlist.id  };
      console.log(bodyyy);
    try{
      const result = await fetch (`http://localhost:3001/api/DelSong`,{
        method: "DELETE",
        headers:{
          "Content-Type": "application/json",

        },
        body: JSON.stringify(bodyyy),
      });
       if (!result.ok) {
        throw new Error("Error al eliminar la playlist");
       }
       const data = await result.json();
       console.log(data.message);
       window.location.reload();
      
    }catch(error){
      console.error("Ni siquiera entro la funcion xd", error.message);
    }
    
  }
  // const eliminarPlaylist = async (playlist_id) => {
  //   try {
  //     const response = await fetch("http://localhost:3001/api/DeletePlaylist", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id: playlist_id }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Error al eliminar la playlist");
  //     }
  //     const data = await response.json();
  //     console.log(data.message);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error al eliminar la playlist:", error.message);
  //   }
  // };

  return (
    <div>
      {/* El user_id solo Se tiene que mostrar en desarrollo comenten o eliminen la linea de abajo */}
      <p>User ID: {user_id}</p>

      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#createPlaylistModal"
      >
        Crear nueva Playlist
      </button>

      <div
        className="modal fade"
        id="createPlaylistModal"
        tabIndex="-1"
        aria-labelledby="createPlaylistModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="createPlaylistModalLabel">
                Nueva Playlist
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="playlist-name" className="col-form-label">
                    ¿Cómo se llamará tu nueva playlist?
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="playlist-name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={agregarPlaylist}
              >
                Crear Playlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {playlists.map((playlist) => (
        <div key={playlist.id} className="card w-75 mb-3">
          <div className="card-body">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  padding: "0",
                  cursor: "pointer",
                }}
                data-bs-toggle="modal"
                data-bs-target={`#deletePlaylistModal-${playlist.id}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bookmark-x-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M6.854 5.146a.5.5 0 1 0-.708.708L7.293 7 6.146 8.146a.5.5 0 1 0 .708.708L8 7.707l1.146 1.147a.5.5 0 1 0 .708-.708L8.707 7l1.147-1.146a.5.5 0 0 0-.708-.708L8 6.293z"
                  />
                </svg>
              </button>
            </div>
            <div
              className="modal fade"
              id={`deletePlaylistModal-${playlist.id}`}
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby={`deletePlaylistModalLabel-${playlist.id}`}
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5"
                      id={`deletePlaylistModalLabel-${playlist.id}`}
                    >
                      Eliminarás la Playlist
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    La playlist junto con todas sus canciones agregadas
                    desaparecerán. ¿Estás seguro de querer eliminarla?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => eliminarPlaylist(playlist.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h5 className="card-title">{playlist.name}</h5>
            <p className="card-text">Playlist_id: {playlist.id}</p>
            <p className="card-text">
              Fecha de Creación:{" "}
              {new Date(playlist.created_at).toLocaleDateString()}
            </p>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target={`#openPlaylistModal-${playlist.id}`}
              onClick={() => fetchSongs(playlist.id)}
            >
              Abrir Playlist
            </button>
            <div
              className="modal fade"
              id={`openPlaylistModal-${playlist.id}`}
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby={`openPlaylistModalLabel-${playlist.id}`}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5"
                      id={`openPlaylistModalLabel-${playlist.id}`}
                    >
                      {playlist.name}
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {songs[playlist.id] ? (
                      <>
                        {songs[playlist.id].length > 0 ? (
                          songs[playlist.id].map((song) => (
                            <div
                              key={song.id}
                              className="card mb-3"
                              style={{ maxWidth: "540px" }}
                            >
                              <div className="row g-0">
                                <div className="col-md-4">
                                  <img
                                    src={song.Image}
                                    className="img-fluid rounded-start"
                                    alt={song.name}
                                  />
                                </div>
                                <div className="col-md-8">
                                  <div className="card-body">
                                    {/* Este es el boton para eliminar la cancion */}
                                    <button style={{ float: "right" }} onClick={()=>deleteSongs(song, playlist)}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="red"
                                        className="bi bi-trash3"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                      </svg>
                                    </button>

                                    <h5 className="card-title">{song.name}</h5>
                                    <p className="card-text">{song.artist}</p>
                                    <p className="card-text">
                                      song_id: {song.id}
                                      
                                    </p>
                                    <p className="card-text"> playlist_id{playlist.id}</p>

                                    <p className="card-text">
                                      <small className="text-muted">
                                        Release Date: {song.Release_Date}
                                      </small>
                                    </p>
                                    {song.Preview_Song && (
                                      <audio controls>
                                        <source
                                          src={song.Preview_Song}
                                          type="audio/mpeg"
                                        />
                                      </audio>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No has agregado nada a la playlist</p>
                        )}
                      </>
                    ) : (
                      <p>Se están cargando las canciones</p>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MisPlaylist;
