import { elements } from './base';

// ---- INTERNAL FUNCTIONS FOR THE SEARCH VIEW ----

const renderMovie = movie => {
  const movieContainer = document.querySelector('.container__movies');
  const markup = `
  <div class="movie">
    <img
      class="movie__img"
      src="${movie.Poster}"
      alt="${movie.Title}"
    />
    <div class="movie__details">
      <h1 class="movie__name">${movie.Title}</h1>
    </div>
  </div>
  `;
  movieContainer.insertAdjacentHTML('beforeend', markup);
};

// Get input from form
export const getInput = () => elements.inputForm.value;

// Clear input field
export const clearInput = () => {
  elements.inputForm.value = '';
};

// Clear previous search from UI
export const clearSearch = () => {
  elements.mainContainer.innerHTML = '';
};

// Render movie search results on page, receives an array
export const renderResults = search => {
  const markup = `
  <div class="container__search">
    <h1 class="results">Search results for "${search.query}"</h1>
    <div class="container__movies">
    </div>
  </div>
  `;
  elements.mainContainer.insertAdjacentHTML('afterbegin', markup);
  search.result.Search.forEach(movie => renderMovie(movie));
};
