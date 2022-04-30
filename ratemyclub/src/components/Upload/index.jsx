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
    <div className="w-75">
    <label for="formFile" className="form-label">
                Upload club image
              </label>
      <input
        className="form-control" type="file" id="formFile"
        onChange={(event) => {
          setImageUpload(event.target.files[event.target.files.length - 1]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {/*imageUrls.map((url) => {
        alert(url)
      })*/}
      </div>
     </>
  );
}

export default Upload;