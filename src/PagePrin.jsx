import { useEffect } from "react";
import LogoutButton from "./components/logOutButton";
import LoginButton from "./components/loginButton";
import { useAuth0 } from "@auth0/auth0-react"; 
import { Link, useNavigate } from "react-router-dom";

const PagePrin = () => {
    const { isAuthenticated } = useAuth0();
    const navigation = useNavigate();
    useEffect(()=> {
        console.log(isAuthenticated ? "Si" : "No");
        // navigation("/Albumi")
    }, [isAuthenticated])
    return(
        <>
            <div>
                <h1>Bienvenido a Albumi</h1>
                <p>Para iniciar con la busqueda por favor inicia sesión</p>
                {/* <LoginButton></LoginButton>
                <LogoutButton></LogoutButton> */}
                <p>Ta logeado? : {isAuthenticated ? "Si" : "No"}</p>
                {isAuthenticated ? <>
                    <LogoutButton />
                        <Link to="/Albumi">
                            Entrar
                        </Link>
                    </> : <LoginButton />}
                
            </div>
        </>
    );
}

export {PagePrin};