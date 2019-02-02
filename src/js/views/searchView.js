import { elements } from './base';

// ---- INTERNAL FUNCTIONS FOR THE SEARCH VIEW ----

// Create pagination button
// Ex: Call it and I say im on page 1, and that I want to render next page,
// It will render button with data to page 2
const createButton = (page, type) => `
  <button class="button button__pagination details__go-${type} animated fadeIn" data-page=${
  type === 'next' ? page + 1 : page - 1
}>
    <i class="icon ion-ios-arrow-round-${
      type === 'next' ? 'forward' : 'back'
    }"></i>Page ${type === 'next' ? page + 1 : page - 1}
  </button>
`;

// Function to render the buttons on the page
// Will receive current page, and num of results to determine what buttons it needs to build
// Since the API only returns 10 results for each query, it can only show 10 items per page
const renderPagination = (page, totalResults) => {
  // Determine how many pages the results need
  const pages = Math.ceil(totalResults / 10);

  let button;

  // If its the page n1, and there are more pages to render, display next
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  }

  // If current page is less than the pages the results need, next and prev buttons are needed
  else if (page < pages) {
    button = `
    ${createButton(page, 'back')}
    ${createButton(page, 'next')}
    `;
  }
  // if current page is equal to number of pages needed, so only prev button
  else if (page === pages && pages > 1) {
    button = createButton(page, 'back');
  }
  if (button) {
    document
      .querySelector('.movies__pagination')
      .insertAdjacentHTML('afterbegin', button);
  }
};

// Render single movie element
const renderMovie = movie => {
  const movieContainer = document.querySelector('.container__movies');
  const img =
    movie.Poster === 'N/A'
      ? `<div class="movie__img"><h1 class="movie__name__noimg">${
          movie.Title
        }</h1>
      <div class="emoji">No image<span>💩</span></div></div>`
      : `<img class="movie__img" src="${movie.Poster}" alt="${movie.Title}"/>`;
  const markup = `
  <div class="movie animated fadeIn" data-id="${movie.imdbID}">
   ${img}
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

// Render movie search results on page, receives an array
// Then calls the renderMovie for each element on the array
export const renderResults = search => {
  if (search.result.Response === 'False') {
    const markup = `
      <div class="container__search">
        <h1 class="results animated fadeIn faster">There were no results for "${
          search.query
        }"</h1>
        <div class="container__movies center">
        <img src="./img/undraw_empty_xct9.svg" alt="Nothing Found" class="no__found animated fadeIn"/>
        </div>
        <div class="movies__pagination"></div>
  </div>
  `;
    elements.mainContainer.insertAdjacentHTML('afterbegin', markup);
  } else {
    const markup = `
    <div class="container__search">
      <h1 class="results animated fadeIn faster">Search results for "${
        search.query
      }"</h1>
      <div class="container__movies">
      </div>
      <div class="movies__pagination"></div>
    </div>

    `;
    elements.mainContainer.insertAdjacentHTML('afterbegin', markup);
    elements.mainContainer.classList.add('to-top');
    search.result.Search.forEach(movie => renderMovie(movie));
    renderPagination(search.page, search.result.totalResults);
  }
};
