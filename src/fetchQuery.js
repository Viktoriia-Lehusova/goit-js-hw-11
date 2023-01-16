import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32843972-0ea5b72fd9aa7da412e1885f6';

export async function fetchQuery(searchQuery, page) {
  const url = `${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  const response = await axios.get(url);
  const data = response.data;
  console.log(data);
  return data;
}

// .then(resp => resp.json())
// .then(data => {
//   if (data.total === 0) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }
//   page += 1;
//   console.log(data);
//   return data.hits;
// });
