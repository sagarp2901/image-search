import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {getImages} from './service';
import { Button, ChakraProvider, Input, Image, Text } from '@chakra-ui/react';


function App() {

  const [photos, setPhotos] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState('');

  const search = (page: number) => {
    if(page > 0 && query.length) {
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
    <ChakraProvider>
      <div className="App">
        <Button colorScheme='blue' onClick={() => search(page-1)}>Previous</Button><div>{page}</div><Button colorScheme='blue' onClick={() => search(page+1)}>Next</Button>
        <Input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder='Search Images' />
              <Button colorScheme='blue' onClick={() => search(page)}>Search</Button>
              <div>Total Results: {total}</div>
              <div className='cards'>
                {photos && photos.map((photo: any)=> {
                  return <div className='card' key={photo.id}>
                          <Image
                            boxSize='300px'
                            objectFit='cover'
                            src={photo.url} alt={photo.alt}
                          />
                          <Text fontSize='sm' align='center'>{photo.alt}</Text>
                    </div>
                })}
              </div>
      </div>
    </ChakraProvider>
    
  );
}

export default App;
