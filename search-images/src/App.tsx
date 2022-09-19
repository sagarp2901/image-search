import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {getImages} from './service';

function App() {

  const [images, setImages] = useState(null);
  const [query, setQuery] = useState('');

  const search = () => {
    getImages(query).then(result => {
      console.log(result);
      setImages(result);
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
    </div>
  );
}

export default App;
