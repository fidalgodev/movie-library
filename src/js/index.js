import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

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
const searchController = async () => {
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
};

// ------ EVENT HANDLERS ------

elements.Form.addEventListener('submit', e => {
  e.preventDefault();
  searchController();
});
