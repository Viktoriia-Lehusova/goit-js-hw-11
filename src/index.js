import Notiflix from 'notiflix';
import './css/style.css';
import { fetchQuery } from './fetchQuery';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let searchQuery = '';
let page = 1;

searchForm.addEventListener('submit', onSearchForm);
btnLoadMore.addEventListener('click', onLoadMore);
btnLoadMore.hidden = true;

function onSearchForm(evt) {
  evt.preventDefault();

  clearPage();
  searchQuery = evt.currentTarget.elements.searchQuery.value;
  console.log(searchQuery);

  resetPage();
  fetchQuery(searchQuery, page).then(hits => createMarkup(hits));

  btnLoadMore.hidden = false;
}

function onLoadMore(evt) {
  page += 1;

  fetchQuery(searchQuery, page).then(hits => createMarkup(hits));

  // const pages = Math.ceil(data.total / perPage);
  // if (page === pages) {
  //   Notiflix.Notify.failure(
  //     'Were sorry, but youve reached the end of search results.'
  //   );
  //   btnLoadMore.hidden = true;
  // }
}

function createMarkup(hits) {
  const markup = hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy"  width = '350px' height = '250px'/>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
  );
  gallery.insertAdjacentHTML('beforeend', markup);
}

function resetPage() {
  page = 1;
}

function clearPage() {
  gallery.innerHTML = '';
}

// async function fetchQuery(searchQuery) {
//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?key=32843972-0ea5b72fd9aa7da412e1885f6&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`
//     );
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
// function fetchQuery(searchQuery) {
//   const url = `https://pixabay.com/api/?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
//   return fetch(url)
//     .then(resp => resp.json())
//     .then(data => {
//       if (data.total === 0) {
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       }
//       page += 1;
//       console.log(data);
//       return data.hits;
//     });
// }
