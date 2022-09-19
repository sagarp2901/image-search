const URL = 'http://localhost:3001/search';

export const getImages = (query) => {
    return fetch(`${URL}?searchQuery=${query}`)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  };