import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from "../components/Menu";
import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from "../context/authContext";




const Single = () => {

    const [post, setPost] = useState({});

    const location = useLocation()

    const navigate = useNavigate();

    const postId = location.pathname.split("/")[2]

    const {currentUser} = useContext(AuthContext)


    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await axios.get(`/posts/${postId}`);
            setPost(res.data);
        } catch(err) {
            console.log(err);
        }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async () =>{
        try {
            await axios.delete(`/posts/${postId}`);
            navigate("/")
        } catch(err) {
            console.log(err);
        }
        }

        const getText = (html) =>{
            const doc = new DOMParser().parseFromString(html, "text/html")
            return doc.body.textContent
        }
    


    return (
        <div className="single">
            <div className="content">
                <img src={`../upload/${post?.img}`} alt="" />
            <div className="user">
                {post.userImg && <img 
                src={post.userImg} 
                alt="" 
                />}
            <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            
             <div className="edit">
                <Link to={`/write?edit=2`} state={post}>
                <img src="https://cdn-icons-png.flaticon.com/128/8162/8162966.png" alt="edit"/>
                </Link>
                <img onClick={handleDelete} src="https://t4.ftcdn.net/jpg/05/78/88/71/240_F_578887164_aeG1uIdCErc0013HI7irmHVDQdNcZvcp.jpg" alt="delete" />
             </div>
             
            </div>
            <h1>{post.title}</h1>
            <p>{getText(post.desc)}</p>
            </div>
            <Menu cat={post.cat}/>
        </div>
    );
};
//"https://images.pexels.com/photos/8630148/pexels-photo-8630148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//"https://images.pexels.com/photos/16039744/pexels-photo-16039744.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
export default Single