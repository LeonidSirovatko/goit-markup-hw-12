import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const escapeHtml = value =>
  String(value).replace(
    /[&<>"']/g,
    character =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character]
  );

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a href="${escapeHtml(largeImageURL)}">
        <img src="${escapeHtml(webformatURL)}" alt="${escapeHtml(tags)}" loading="lazy" />
      </a>
      <ul class="image-info">
        <li><b>Likes</b>${likes}</li><li><b>Views</b>${views}</li>
        <li><b>Comments</b>${comments}</li><li><b>Downloads</b>${downloads}</li>
      </ul>
    </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}
export function showLoader() {
  loader.hidden = false;
}
export function hideLoader() {
  loader.hidden = true;
}
export function showLoadMoreButton() {
  loadMoreButton.hidden = false;
}
export function hideLoadMoreButton() {
  loadMoreButton.hidden = true;
}
