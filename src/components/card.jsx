import React from "react";

const Card = ({ element }) => {
  return (
    //La llave o Id se esta tomando del elemento
    <div key={element.id}  className="card mb-3" style={{ width: "24rem" } }> 
      <div className="row g-0">
        <div className="col-md-4">
          <img src={element.album.images[0].url} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{element.name}</h5>
            <p className="card-text">
             {element.id} <br/>             
             Artista: {element.album.artists[0].name} <br/>
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
