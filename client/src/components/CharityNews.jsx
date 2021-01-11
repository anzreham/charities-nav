import React, {useState} from 'react';
import parse from "html-react-parser"
 import 'react-quill/dist/quill.snow.css';
 import axios from 'axios';
 import CharHeader from './CharHeader';
 import Storage from './Storage';
 import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; // ES6


const CharityNews = () => {
    const [charityid, setid]               = useState(Storage.get("id"));
    const [title, settitle]                = useState('');
    const [content, setContent]            = useState('');
    const[messageSubmit, setMessageSubmit] = useState("")
     
    const handleSubmit = (e) => {
        e.preventDefault();
        const addNews={ "content" : content , "title" :title , "user":charityid}
        axios
          .post('http://localhost:7000/api/news?format=json', addNews)
          .then((res) => {
              console.log(res.data.errors)
              if(!res.data.errors){
                  setMessageSubmit("Your post has been submitted")
                  settitle("")
                  setContent("")
              }else{
                setMessageSubmit("")
              }
            } )
            .catch((err) => console.error(err) );
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
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Title</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="" onChange = {(e)=>settitle(e.target.value)}  value = {title}/>
                            </div>
                        </div>
                    <ReactQuill theme="snow" value={content} onChange={setContent} />   
                    <div>
                        {/* {parse(content)}    */}
                    </div>
                    <button className="btn mb-4  btn-lg btn-block"  id = "Charbtn" type='submit' onClick={()=>handleSubmit()}>Post</button> 
                    <p>{messageSubmit}</p>
                    </form>
                </div>
            </div>
        </div>
        </>       
    );
};

export default CharityNews;
