import { useEffect } from "react";
import LogoutButton from "./components/logOutButton";
import LoginButton from "./components/loginButton";
import { useAuth0 } from "@auth0/auth0-react"; 
import { Link } from "react-router-dom";

const PagePrin = () => {
    const { isAuthenticated } = useAuth0();
    //Se utiliza para pruebas para que en cosola te muestre si esta iniciada sesión o no -> Nelly
    useEffect(()=> {
        console.log(isAuthenticated ? "Si" : "No");
    }, [isAuthenticated])
    return(
        < >
            <div style={{
                backgroundColor: '#1C1018',
                color: '#95E06C',
                width: '100vw',
                height: '100vh', 
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start', 
                    width: '100%', 
                    paddingLeft: '70px',
                    position: 'relative', 
                    top: '-200px'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-music-fill" viewBox="0 0 16 16">
                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-.5 4.11v1.8l-2.5.5v5.09c0 .495-.301.883-.662 1.123C7.974 12.866 7.499 13 7 13s-.974-.134-1.338-.377C5.302 12.383 5 11.995 5 11.5s.301-.883.662-1.123C6.026 10.134 6.501 10 7 10c.356 0 .7.068 1 .196V4.41a1 1 0 0 1 .804-.98l1.5-.3a1 1 0 0 1 1.196.98"/>
                    </svg>
                </div>
                <div style={{
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center'
                }}>
                <h1 style={{
                    margin: '10px'
                }}>Bienvenido a Albumi</h1>
                <p style={{
                    opacity:0.5,
                    marginBottom: '15px'
                }}>Para iniciar con la busqueda por favor inicia sesión</p>
                {/* si la persona ya inicio sesión le va a salir el boton de cerrar sesión y otro que sera para entrar a la pagina donde se puede hacer busquedas por la API */}
                {isAuthenticated ? <div
                style={{
                    display: 'flex'
                }}>
                    <LogoutButton/>
                        <Link to="/Albumi" style={{
                            backgroundColor:'#95E06C',
                            color: '#1C1018',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            marginLeft: '15px',
                            textDecoration: 'none'
                        }}>
                            Entrar
                        </Link>
                        {/* si el usuario no a iniciado sesión solo va a poder ver un boton que seria el de iniciar sesión -> Nelly */}
                    </div> : <LoginButton />}
                
                </div>
            </div>
        </>
    );
}

export {PagePrin};