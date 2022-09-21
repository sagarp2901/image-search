const URL = 'http://localhost:3001/search';

export const getImages = (query, page) => {
    return fetch(`${URL}?searchQuery=${query}&page=${page}`)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  };