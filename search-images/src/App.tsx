import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {getImages} from './service';



function App() {

  const [photos, setPhotos] = useState<any>(null);
  const [query, setQuery] = useState('');

  const search = () => {
    getImages(query).then(result => {
      console.log(result);
      setPhotos(result.photos);
    });
  }

  const handleChange = (e: any)=>{
    setQuery(e.target.value);
 }

  return (
    <div className="App">
     <input
          type="text"
          value={query}
          onChange={handleChange}/>
          <button onClick={search}>Search</button>
          <div>
            {photos && photos.map((photo: any)=> {
              return <div key={photo.id}><img src={photo.src.small} alt={photo.alt}/></div>
            })}
          </div>
    </div>
  );
}

export default App;
