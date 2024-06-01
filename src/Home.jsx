import Profile from "./profile.js";
import Navbar from "./components/NavBar.jsx";
import {  useState } from "react";
import Card from "./components/card.jsx";
const Home = () => {
    const [tracks, setTracks] = useState([]);
    const [keyword, setKeyword] = useState(""); 
    const getTracks = async () => {
        try {
        let data = await fetch(`https://v1.nocodeapi.com/cuitlan/spotify/NLLeDlWExOvKCbvS/search?q=${keyword}&type=track`);   //Se toma el dato de el navbar
        let convertedData = await data.json();
        console.log(convertedData.tracks.items);
        setTracks(convertedData.tracks.items);
        } catch (error) {
        console.error("Error fetching tracks:", error);
        }
    };
    return(
        <>
            <div  style={{
                backgroundColor: '#1C1018',
                color: '#95E06C'
            }}>
                <Navbar getTracks={getTracks} keyword={keyword} setKeyword={setKeyword} />
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}> 
                    <div style={{
                        backgroundColor: '#68B684',
                        padding:'10px',
                        color: '#1C1018',
                        height: '100vh'
                    }}>
                        <section style={{
                            padding:'10px',
                            boxShadow: '2px 2px 1px  rgba(83, 146, 105, 0.9)',
                            borderRadius: '15px'
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
                            <div className="container">
                                <div className="row justify-content-evenly">
                                {tracks.map((element) => {
                                    return <Card key={element.id} element={element} />;
                                })}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home