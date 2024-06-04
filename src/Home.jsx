
import { React, useState } from "react";
import Profile from "./profile.js";
import Navbar from "./components/NavBar.jsx";
import Card from "./components/card.jsx";
import { useAuth0 } from "@auth0/auth0-react"; 
const Home = () => {
    const [tracks, setTracks] = useState([]);
    const [keyword, setKeyword] = useState(""); 
    const { isAuthenticated } = useAuth0(); 
    const getTracks = async () => {
        try {
        let data = await fetch(`https://v1.nocodeapi.com/cuitlan/spotify/NLLeDlWExOvKCbvS/search?q=${keyword}&type=track`);   //Se toma el dato de el navbar
        let convertedData = await data.json();
        // console.log(convertedData.tracks.items);
        setTracks(convertedData.tracks.items);
        } catch (error) {
        console.error("Error fetching tracks:", error);
        }
    };
    return(
        <>
            <div  style={{
                backgroundColor: '#1C1018',
                color: '#95E06C',
                width: '100vw',
                height:'100vh'
            }}>
                <Navbar getTracks={getTracks} keyword={keyword} setKeyword={setKeyword} />
                {/* Si no a iniciado sesion van aparecen las secciones de ver tu perfil - Nelly */}
                {isAuthenticated ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}> 
                    <div style={{
                        backgroundColor: '#68B684',
                        padding:'10px',
                        color: '#1C1018',
                        maxHeight: '90vh',
                        width:'280px'
                    }}>
                        <section style={{
                            padding:'10px',
                            boxShadow: '2px 2px 1px  rgba(83, 146, 105, 0.9)',
                            borderRadius: '15px',
                            height: '100px'
                        }}>
                            <Profile />
                        </section>
                        <div>
                            {/* Aqui va el boton de crear playlist y el como se veria la playlist - Nelly */}
                        </div>
                    </div>
                    <div style={{
                        margin: '10px'
                    }}>

                        <section>
                            {/* Le estamos dando la indicacion que en el contededor de las canciones solo se hace scroll */}
                            <div className="container" style={{
                                maxHeight: '88.5vh',
                                overflow: 'auto'
                            }}>
                                <div className="row justify-content-evenly">
                                {tracks.map((element) => {
                                    return <Card key={element.id} element={element} />;
                                })}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                ): (
                    // Si no has iniciado sesion va aparecerer el siguiente mensaje -Nelly
                    <div style={{ 
                        display: 'flex', 
                        padding: '10px',  
                        justifyContent: 'center',
                        opacity: '0.5', 
                        maxHeight: '100vh' 
                    }}>
                        <h2 style={{
                            marginTop: '270px'
                        }}>Por favor, inicia sesión para ver tu perfil.</h2>
                    </div>
                )}
            </div>
        </>
    );
}

export default Home