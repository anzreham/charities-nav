import React, {useState} from 'react';
import parse from "html-react-parser"
 import 'react-quill/dist/quill.snow.css';
 import axios from 'axios';
 import CharHeader from './CharHeader';
 import Storage from './Storage';
 import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; // ES6


const CharityNews = () => {
  
    const [title, settitle]                = useState('');
    const [content, setContent]            = useState('');
    const [jwtStr, setjwtStr]            = useState('');
    const[messageSubmit, setMessageSubmit] = useState("");
     
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handle submit")
        setjwtStr(Storage.get("token"))
        const config = {
            headers: { Authorization: `Bearer ${jwtStr}` }
        };
        const addNews={
            "title": title,
            "content": content
         
        }
      
        axios
          .post('http://localhost:8000/api/charity/news/?format=json', addNews, config )
          .then((res) => {
              
              if(!res.data.errors){
                console.log("Your post has been submitted")
                  setMessageSubmit("Your post has been submitted")
                  settitle("")
                  setContent("")
              }else{
                setMessageSubmit("Not Submitted")
              }
            } )
            .catch((err) => setMessageSubmit("Not Submitted") );
    };

    return (
        <> 
        <CharHeader />        
        <div className = "Dbody" > 
            <div className = "Dcontainer">
                <div className="Dform">
                    <div className="header">
                        <h1>Welcome!</h1>
                        <p>Please provide your information below.</p>
                    </div>  
                    <form>
                        <div className="form-group row">
                            <label  className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="" onChange = {(e)=>settitle(e.target.value)}  value = {title}/>
                            </div>
                        </div>
                    <ReactQuill theme="snow" value={content} onChange={setContent} />   
                    <div>
                        {/* {parse(content)}    */}
                    </div>
                    <button className="btn mb-4  btn-lg btn-block"  id = "Charbtn" type='submit' onClick={handleSubmit} >Post</button> 
                    <p>{messageSubmit}</p>
                    </form>
                </div>
            </div>
        </div>
        </>       
    );
};

export default CharityNews;
