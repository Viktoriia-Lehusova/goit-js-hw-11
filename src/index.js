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
// btnLoadMore.hidden = true;

function onSearchForm(evt) {
  evt.preventDefault();

  clearPage();
  searchQuery = evt.currentTarget.elements.searchQuery.value;
  // btnLoadMore.hidden = true;

  resetPage();
  fetchQuery(searchQuery, page)
    .then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        btnLoadMore.classList.add('hidden');
      } else {
        createMarkup(data.hits);
        btnLoadMore.classList.remove('hidden');
      }
    })
    .catch(err => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

function onLoadMore(evt) {
  page += 1;

  fetchQuery(searchQuery, page).then(data => {
    createMarkup(data.hits);
    warningMessage(data);
  });
}
function warningMessage(data) {
  const perPage = 40;

  const pages = Math.ceil(data.totalHits / perPage);
  if (page === pages) {
    Notiflix.Notify.failure(
      'We are sorry, but you have reached the end of search results.'
    );
    btnLoadMore.hidden = true;
  }
}

function createMarkup(hits) {
  const markup = hits
    .map(
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
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function resetPage() {
  page = 1;
}

function clearPage() {
  gallery.innerHTML = '';
}
