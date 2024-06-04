import React, { useState, useEffect } from "react";
import "../App.css";

// Este es el item de playlist en el modal

const PlaylistItem = ({ item, elemento }) => {
  async function guardarCancion(idpleilist) {
    const songData = {
      playlist_id: idpleilist,
      song_id: elemento.id,
      name: elemento.name,
      artist: elemento.album.artists[0].name,
      Release_Date: elemento.album.release_date,
      Preview_Song: elemento.preview_url,
      Image: elemento.album.images[0].url,
    };

    try {
      const response = await fetch("http://localhost:3001/api/AddSong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songData),
      });

      if (response.ok) {
        console.log("En efecto se guardo la cancion");
      } else {
        console.error(
          "Error al guardarla pero es un error aca de los maquiavelicos"
        );
      }
    } catch (error) {
      console.error("Error al realizar la peticion al back:", error);
    }
  }

  return (
    <div
      key={item.id}
      className="form-check form-check-inline row w-100 align-items-center justify-content-center mb-4"
    >
      {console.log("el item pasado:", item)}
      <div className="col-auto d-flex align-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="black"
          class="bi bi-music-note-list p-2 rounded-1"
          style={{ backgroundColor: "rgb(83, 146, 105)" }}
          viewBox="0 0 16 16"
        >
          <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2" />
          <path fill-rule="evenodd" d="M12 3v10h-1V3z" />
          <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1z" />
          <path
            fill-rule="evenodd"
            d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5"
          />
        </svg>
        <label
          className="form-check-label mx-4 w-100 text-white pe-2"
          style={{ fontSize: 26 }}
        >
          {item.name}
        </label>
        <input
          className="form-check-input checkPlaylist btn-outline-success"
          type="checkbox"
          // aqui tengo que mandar el id de la playlist
          onClick={() => guardarCancion(elemento.id)}
        />
      </div>
    </div>
  );
};

const Card = ({ element }) => {
  // use el session storage para agarrar el user id, el context me lo trae nulo
  const user_id = sessionStorage.getItem("user_id");
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const [playlistInput, setPlaylistInput] = useState(false);
  const [nombrePlaylist, setNombrePlaylist] = useState(null);

  // Esta funcion nos da las playlists del usuario
  async function getPlaylists(id) {
    try {
      // acá pasamos como parametro el id en la ruta
      const response = await fetch(
        `http://localhost:3001/api/MyPlaylist/${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }
      const data = await response.json();

      console.log(data);
      // data es la repsuesta, se la asignamos a la constante de playlists
      setPlaylists(data);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      setError(error.message);
    } finally {
      return <div>Loading...</div>;
    }
  }

  const [isLoading, setIsLoading] = useState(true);

  if(isLoading){
    return <div>Loading...</div>
  }

  useEffect(() => {
    // se consiguen las playlists hasta que esté disponible el id del usuario
    if (user_id) {
      setIsLoading(true); // Iniciar carga
      getPlaylists(user_id)
        .then(() => {
          setIsLoading(false); // Finalizar carga
        })
        .catch((error) => {
          setIsLoading(false); // Finalizar carga en caso de error
          setError(error.message);
        });
    } else {
      console.error("user_id is null");
    }
  }, [user_id]);

  function createPlaylist() {
    setPlaylistInput(true);
  }

  function savePlaylist() {
    setPlaylistInput(false);
    console.log(nombrePlaylist);
  }

  return (
    // La llave o Id se está tomando del elemento que es la cancion
    <div
      key={element.id}
      className="card justify-content-center gy-4 position-relative"
      style={{ width: "20rem" }}
    >
      <button
        type="button"
        className="btn btn-primary icon-container bg-white border-white"
        data-bs-target={`#modal${element.id}}`}
        data-bs-toggle="modal"
        onClick={() => getPlaylists(user_id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#95E06C"
          className="bi bi-bookmark-plus-fill"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z"
          />
        </svg>
      </button>
      {/* Esto es del modal de cancion, cuidado pq tiene clases de boostrap y de react */}
      <div
        class="modal fade   "
        id={`modal${element.id}}`}
        tabindex="-1"
        aria-labelledby="playlists"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content" style={{ backgroundColor: "#1C1018" }}>
            <div class="modal-header">
              <div className="flex w-100 text-end p-3">
                <button
                  type="button"
                  class="btn-close bg-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            {playlistInput ? (
              <>
                <div class="modal-body">
                  <div
                    style={{
                      fontSize: 20,
                      fontStyle: "italic",
                      color: "white",
                      marginBottom: 10,
                    }}
                  >
                    Crear playlist
                  </div>
                  {/* Aqui podemos crear una nueva playlist */}
                  <input
                    type="text"
                    class=" p-2 w-100"
                    style={{ backgroundColor: "black", color: "white" }}
                    onChange={(event) => setNombrePlaylist(event.target.value)}
                    placeholder="Nombre"
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-success"
                    style={{ fontWeight: 400 }}
                    onClick={savePlaylist}
                  >
                    Crear
                  </button>
                </div>
              </>
            ) : (
              <>
                <div class="modal-body">
                  <div class="container mb-3 px-3">
                    <div
                      class=" pt-2 pb-4"
                      style={{
                        fontSize: 20,
                        fontStyle: "italic",
                        color: "white",
                      }}
                    >
                      Mis playlist
                    </div>
                    <div>
                      {/* Aquí se rendderizan las playlists */}
                      {Array.isArray(playlists) && playlists.length > 0 ? (
                        playlists.map((p) => (
                          <PlaylistItem
                            key={p.id}
                            item={p}
                            elemento={element}
                          />
                        ))
                      ) : (
                        <div className="font-thin text-xl text-white">
                          No hay playlists
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class=" modal-footer flex w-100 text-end p-3">
                  <button
                    type="button"
                    class="btn btn-success"
                    style={{ fontWeight: 200 }}
                    onClick={createPlaylist}
                  >
                    Nueva Playlist
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-md-4">
          <img
            src={element.album.images[0].url}
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-8 p-1">
          <div className="card-body">
            <h5 className="card-title pe-4">{element.name}</h5>
            <p className="card-text p-1">
              {/* {element.id} <br /> */}
              Artista: {element.album.artists[0].name} <br />
              Released: {element.album.release_date}
              {/* Por aca debería de estar un botón para agregarlo a la playlist, y definir la playlist a la que se irán todo por id playlist y id del álbum */}
            </p>
            {/* Aca es lo del audio le puse con w de 100 pero se puede adaptar */}
            <audio src={element.preview_url} controls className="w-100"></audio>
            <p className="card-text">
              <small className="text-body-secondary"></small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
