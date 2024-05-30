import React from "react";
import guardar from "../images/bookmark-plus-fill.svg";
import "../App.css";

const Card = ({ element }) => {
  function guardarCancion() {
    console.log("Sale el modal para agregar cancion");
  }

  return (
    //La llave o Id se esta tomando del elemento
    <div
      key={element.id}
      className="card justify-content-center gy-4 position-relative"
      style={{ width: "24rem" }}
    >
      <div className="icon-container" onClick={guardarCancion}>
        {/* <img className="guardar-icon" src={guardar} /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#318BE5"
          class="bi bi-bookmark-plus-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z"
          />
        </svg>
      </div>
      <div className="row align-items-center">
        <div className="col-md-4 ">
          <img
            src={element.album.images[0].url}
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{element.name}</h5>
            <p className="card-text">
              {element.id} <br />
              Artista: {element.album.artists[0].name} <br />
              Lanzamiento: {element.album.release_date}
              {/* //Por aca deberia de estar Un boton para agregarlo a playlist, Y definir la playlist a la que se iran todo por id playlist y id del album */}
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
