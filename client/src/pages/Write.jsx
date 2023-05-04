import React, { useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom"
import moment from "moment";


const Write = () => {

    const state = useLocation().state

    const { quillRef } = useQuill();
    const [value, setValue] = useState(state?.title || "");
    const [title, setTitle] = useState(state?.desc || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || '');

    const navigate = useNavigate();


    const upload = async ()=>{
        try{
            const formData = new FormData();
            formData.append("file", file)
            const res = await axios.post("/upload", formData)
            return res.data
        }catch(err){
            console.log(err)
        }
    }

const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try{
        state ? await axios.put(`/posts/${state.id}`, {
            title,
            desc:value,
            cat,
            img: file ? imgUrl : "",
        }) 
        : await axios.post(`/posts/`, {
            title,
            desc:value,
            cat,img:file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        });
        navigate("/")
    }catch(err) {
        console.log(err)
    }
};



    return (
        <div className='add'>
            <div className="content">
                <input className="title" value={title} type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                     <div style={{ height: 300 }}>
                        <div className="editor" ref={quillRef} value={value} onChange={setValue} />
                    </div> 
                    {/*<ReactQuill
                        className="editor"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                />*/}
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft <br></br>
                    </span>
                    <span>
                        <b>Visibility: </b> Public <br></br>
                    </span> <br></br>
                    <input style={{display:"none"}} type="file" id="file" name="" onChange={e=>setFile(e.target.files[0])}/>
                    <label className="file" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>

                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                    <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "nature"} name="cat" value="nature" id="nature" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="nature">Nature</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id="cinema" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="food">Food</label>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Write