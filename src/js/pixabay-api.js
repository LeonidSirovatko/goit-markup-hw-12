import axios from 'axios';

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY || '';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  if (!API_KEY) {
    throw new Error(
      'Добавьте Pixabay API key в файл .env (VITE_PIXABAY_API_KEY), затем перезапустите npm run dev.',
    );
  }

  const { data } = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });
  return data;
}
