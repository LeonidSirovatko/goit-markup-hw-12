import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  hideLoadMoreButton,
  hideLoader,
  showLoadMoreButton,
  showLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');
let query = '';
let page = 1;
let totalHits = 0;
let requestId = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = new FormData(event.currentTarget).get('searchQuery').trim();
  if (!query) return;
  page = 1;
  totalHits = 0;
  requestId += 1;
  hideLoadMoreButton();
  clearGallery();
  await loadImages(requestId, true);
  form.reset();
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  await loadImages(requestId, false);
});

async function loadImages(currentRequest, isNewSearch) {
  showLoader();
  hideLoadMoreButton();
  try {
    const data = await getImagesByQuery(query, page);
    if (currentRequest !== requestId) return;
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      if (isNewSearch)
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      return;
    }
    createGallery(data.hits);
    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
    if (!isNewSearch) {
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch (error) {
    if (currentRequest === requestId) {
      if (!isNewSearch && page > 1) page -= 1;
      iziToast.error({
        message:
          error.response?.data?.message ||
          error.message ||
          'Something went wrong. Please try again.',
      });
    }
  } finally {
    if (currentRequest === requestId) hideLoader();
  }
}
