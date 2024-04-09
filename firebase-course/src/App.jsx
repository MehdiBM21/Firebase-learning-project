import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './components/SignIn'
import { auth, db, storage } from './config/firebase'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'


function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollection = collection(db, "movies");
  const [movie, setMovie] = useState({
    title:"",
    releaseDate:0,
    gotOscar:false,
    userId: auth?.currentUser?.uid
  })
  //state for updates
  const [updatedTitle, setUpdatedTitle] = useState("");

  const [fileUpload, setFileUpload] = useState(null);
  function handleFileChange(event) {
    setFileUpload(event.target.files[0]);
  }

  function handleUpdateTitle(event) {
    setUpdatedTitle(event.target.value);
  }
 
function handleChange(event) {
  const { name, value } = event.target;
  console.log(value);
  setMovie({
    ...movie,
    [name]: value,
  });
}
function handleCheck(event) {
  const { name, checked } = event.target;
  console.log(checked);
  setMovie({
    ...movie,
    [name]: checked,
  });
}
async function getMovieList(){
  try{
    const data = await getDocs(moviesCollection);
    const filteredData= data.docs.map((doc) => ({
      ...doc.data(), 
      id:doc.id
    }))
    console.log(filteredData);
    setMovieList(filteredData);
  }catch(error){
    console.error(error);
  }
};
  useEffect(() => {
    getMovieList();
  }, []);

  async function submitMovie(){
    try{
      await addDoc(moviesCollection, movie);
      getMovieList();
    }catch(error){
      console.error(error);
    }
  }
  async function deleteMovie(id){
    try{
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    }catch(error){
      console.error(error);
    }
  }
  async function updateMovie(id){
    try{
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {title: updatedTitle});
      getMovieList();
    }catch(error){
      console.error(error);
    }
  }

  async function uploadFile() {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `files/${fileUpload.name}`);
    try {
      await uploadBytes(fileRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
  }
  return(
    <>
      <SignIn />
<br/>
      <div>
        <input type="text" name="title" placeholder='movieTitle' onChange={handleChange}/>
        <input type="number" name="releaseDate" placeholder='releaseDate'onChange={handleChange}/>
        <input type="checkbox" name="gotOscar" checked={movie.gotOscar} onChange={handleCheck}/>
        <label>received an oscar</label>
        <button onClick={submitMovie}>submit movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{color: movie.gotOscar? "green":"red"}}>{movie.title}</h1>
            <p>{movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>

          <input type="text" name="title" placeholder='movieTitle' onChange={handleUpdateTitle}/>
          <button onClick={() => updateMovie(movie.id)}>Update</button> 
            </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={handleFileChange}/>
        <button onClick={uploadFile}>Submit file</button>
      </div>
    </>
  )
}

export default App
