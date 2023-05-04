import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext"

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext);


    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                    <img src="https://cdn.pixabay.com/photo/2016/12/27/13/10/logo-1933884__340.png" alt="logo" className="logo" />
                    </Link>
                </div>
                <div className="links">
                    <Link className="link" to="/?cat=asia">
                        <h6>Asia</h6>
                    </Link>
                    <Link className="link" to="/?cat=africa">
                        <h6>Africa</h6>
                    </Link>
                    <Link className="link" to="/?cat=europe">
                        <h6>Europe</h6>
                    </Link>
                    <Link className="link" to="/?cat=oceania">
                        <h6>Oceania</h6>
                    </Link>
                    <Link className="link" to="/?cat=northAmerica">
                        <h6>North America</h6>
                    </Link>
                    <Link className="link" to="/?cat=southAmerica">
                        <h6>South America</h6>
                    </Link>
                    <span className="write">
                        <Link className="link" to="/write">Write</Link>
                    </span>
                    <div className="userStatus">
                    <span className="userNameStatus">Username: {currentUser?.username}</span>
                    <br></br>
                    {currentUser ? ( 
                        <span className="logout" onClick={logout}>Logout</span> 
                    ) : ( 
                        <Link className="link" to="/login">
                            Login
                        </Link>
                    )}
                    </div>
                </div>
            </div>
        </div>    
    )   

}

export default Navbar