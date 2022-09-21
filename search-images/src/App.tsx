import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {getImages} from './service';



function App() {

  const [photos, setPhotos] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState('');

  const search = (page: number) => {
    if(page > 0) {
      getImages(query, page).then(result => {
        console.log(result);
        setPhotos(result.photos);
        setTotal(result.total);
        setPage(result.page);
      });
    }
  }

  const handleChange = (e: any)=>{
    setQuery(e.target.value);
 }

  return (
    <div className="App">
     <button onClick={() => search(page-1)}>Previous</button><div>{page}</div><button onClick={() => search(page+1)}>Next</button>
     <input
          type="text"
          value={query}
          onChange={handleChange}/>
          <button onClick={() => search(page)}>Search</button>
          <div>Total Results: {total}</div>
          <div>
            {photos && photos.map((photo: any)=> {
              return <div key={photo.id}><img src={photo.url} alt={photo.alt}/></div>
            })}
          </div>
    </div>
  );
}

export default App;
