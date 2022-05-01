import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

function Upload() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (

    <>
    <div className="w-100">
       
    <label for="formFile" className="form-label">
                Upload club image
              </label> <div className="d-flex ">
      <input
        className="form-control" type="file" id="formFile"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button className ="btn btn-secondary px-2 py-1 ms-3" onClick={uploadFile}> Upload&nbsp;Image</button></div>
      {/*imageUrls.map((url) => {
        alert(url)
      })*/
      console.log(imageUrls[imageUrls.length-1])}
      </div>
     </>
  );
}

export default Upload;