import Search from './models/Search';
import Movie from './models/Movie';
import * as searchView from './views/searchView';
import * as movieView from './views/movieView';
import {
  elements,
  renderLoader,
  clearLoader,
  renderHome,
  clearUI,
} from './views/base';

require('../css/main.scss');

// The global state of the app
/*
  - Search object
  - Current movie object
  - Watched movies object
  - Favorite movies object
*/
const state = {};
window.state = state;

// ------ SEARCH CONTROLLER ------
// Receives type parameter, to know if its a new search from the input search
// Or if its a new search because of requesting another page from previous query
const searchController = async (type, page) => {
  if (type === 'new') {
    // Get query from view
    const query = searchView.getInput();

    // If there is any query
    if (query) {
      // Create the search and add it to the state
      state.search = new Search(query);

      // Prepare UI for results
      searchView.clearInput();
      clearUI();
      renderLoader();

      try {
        // Search for the movies
        await state.search.getResults();

        // Render movies on page
        clearLoader();
        searchView.renderResults(state.search);
      } catch (error) {
        clearLoader();
        console.log(error);
      }
    }
  } else if (type === 'used') {
    // Prepare UI for results
    searchView.clearInput();
    clearUI();
    renderLoader();

    try {
      // Search for the movies of specific page from previous query
      await state.search.getResults(page);

      // Render movies on page
      clearLoader();
      searchView.renderResults(state.search);
    } catch (error) {
      clearLoader();
      console.log(error);
    }
  }
};

// ------ MOVIE CONTROLLER ------
// async function that will get the ID of the movie to get
const movieController = async id => {
  if (id) {
    // Create the movie object and add it to the state
    state.movie = new Movie(id);

    // Prepare UI for results
    clearUI();
    renderLoader();

    try {
      // Search for the movie
      await state.movie.getMovie();

      // Render movie on page
      clearLoader();
      movieView.renderMovie(state.movie);
    } catch (error) {
      console.log(error);
    }
  }
};

// ------ EVENT LISTENERS ------

// Event listener on the form submit for search
elements.Form.addEventListener('submit', e => {
  e.preventDefault();
  searchController('new');
});

// Event listeners on the container that are placed by js
elements.mainContainer.addEventListener('click', e => {
  const button = e.target.closest('.button__pagination');
  const movie = e.target.closest('.movie');
  const back = e.target.closest('.details__go-back');
  if (button) {
    console.log(button);
    const page = parseInt(button.dataset.page, 10);
    searchController('used', page);
  }
  if (movie) {
    const movieID = movie.dataset.id;
    // Call movie controller
    movieController(movieID);
  }
  if (back) {
    searchController('used', state.search.page);
  }
});

// Event listener for logo
elements.logo.addEventListener('click', e => {
  if (e.target.matches('.logo, .logo *')) {
    searchView.clearInput();
    clearUI();
    renderHome();
  }
});
