import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader, renderHome } from './views/base';

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
      searchView.clearSearch();
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
    searchView.clearSearch();
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

// ------ EVENT LISTENERS ------

// Event listener on the form submit for search
elements.Form.addEventListener('submit', e => {
  e.preventDefault();
  searchController('new');
});

// Event listeners on the container that are placed by js
elements.mainContainer.addEventListener('click', e => {
  const button = e.target.closest('.button__pagination');
  if (button) {
    const page = parseInt(button.dataset.page, 10);
    searchController('used', page);
  }
});

// Event listener for logo
elements.logo.addEventListener('click', e => {
  if (e.target.matches('.logo, .logo *')) {
    searchView.clearInput();
    searchView.clearSearch();
    renderHome();
  }
});
