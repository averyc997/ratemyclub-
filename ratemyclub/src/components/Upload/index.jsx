import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { storage } from "../../firebase";
import { v4 } from "uuid";

function Upload() {
    const [progress, setProgress] = useState(0);
    const [style, setStyle] = useState("");
    const [style2, setStyle2] = useState("");

    const history = useNavigate();
    
    const formHandler = (e) => {
      e.preventDefault();
      const file = e.target[0].files[0];
      uploadFiles(file);
    };
  
    const uploadFiles = (file) => {

      if (!file) return;
      const sotrageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(sotrageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            history(`?${downloadURL}`);
          });
        }
      );
    };  const changeStyle = () => {      
        setStyle("checked");
      };
      const changeStyle2 = () => {      
        setStyle2("checkBtn");
      };
  return (
    <>
      <form onSubmit={formHandler}>
        <label for="formFile" class="form-label">Upload club image<span class="text-danger">*</span>
</label>
        <input type="file" className="input form-control" onChange={changeStyle2} />
        <div className="d-flex align-items-center mt-2">
        <p className="mb-0 fw-bold">{progress == 0 ? "" : `Upload Success!`}</p>
        <div className={`d-none${style2}`}>
        <strong className={`me-4${style2}`}>{progress == 0 ? "Confirm Image?" : ""}</strong>
        <button onClick={changeStyle} type="submit" className={`btn-light btn ms-2 ${style}`}></button>
        </div>
        </div>
      </form>
 
     </>
  );
}

export default Upload;