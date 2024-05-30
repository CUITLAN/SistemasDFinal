import Profile from "./profile.js";
import Navbar from "./components/NavBar.jsx";
import { useEffect, useState } from "react";
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
            <section>
                <div className="App">
                    <Navbar getTracks={getTracks} keyword={keyword} setKeyword={setKeyword} />
                    <h1>Inicia tu busqueda</h1>
                    <Profile />
                </div>
                <div className="container">
                    <div className="row">
                    <div className="col"></div>
                    {tracks.map((element) => {
                        return <Card key={element.id} element={element} />;
                    })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home