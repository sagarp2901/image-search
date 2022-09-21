import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {getImages} from './service';
import { Button, ChakraProvider, IconButton, Input, Image, Text  } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';


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
        <div className='input-header'>
          <div>
          <Input minWidth={350}
          width={350}
          isRequired
          focusBorderColor='gray'
                type="text"
                value={query}
                onChange={handleChange}
                placeholder='Search Images' />
          <IconButton className='search-btn' aria-label='search' style={{marginRight: '3rem'}} colorScheme='gray' icon={<SearchIcon/>} onClick={() => search(page)}>Search</IconButton>
          </div>
          <div className='page-results'>
            <IconButton aria-label='Previous' colorScheme='blue' icon={<ChevronLeftIcon/>} onClick={() => search(page-1)}>Previous</IconButton>
            <div style={{marginRight: '1rem', marginLeft: '1rem'}}>Page: {page}</div>
            <IconButton aria-label='Next' colorScheme='blue' icon={<ChevronRightIcon/>} onClick={() => search(page+1)}>Next</IconButton>
            <div style={{paddingLeft: '3rem', fontSize: '18px'}}>Total Results: {total}</div>
          </div>
        </div>
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
