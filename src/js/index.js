import Search from './models/Search';
import Movie from './models/Movie';
import Favorites from './models/Favorite';
import Watcheds from './models/Watched';
import * as searchView from './views/searchView';
import * as movieView from './views/movieView';
import * as favoriteView from './views/favoritesView';
import * as watchedView from './views/watchedView';
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
const movieController = async (id, fromMenu = false) => {
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
      movieView.renderMovie(
        state.movie,
        state.favorites.checkFavorite(id),
        state.watcheds.checkWatched(id),
        fromMenu
      );
    } catch (error) {
      console.log(error);
    }
  }
};

// ------ LIKE CONTROLLER ------
const favoriteController = () => {
  // If there is no favorite state, create it
  if (!state.favorites) state.favorites = new Favorites();

  // Save ID of current movie
  const movieID = state.movie.id;

  // If movie isn't favorited already, add to favorites
  if (!state.favorites.checkFavorite(movieID)) {
    // Add to favorite

    const newFavorite = state.favorites.addFavorite(
      movieID,
      state.movie.img,
      state.movie.title
    );

    // Toggle Button heart
    favoriteView.toggleFavorite(true);

    // Render new favorite on the list
    favoriteView.renderFavorite(newFavorite);
  }
  // If it is, remove from favorites
  else {
    // Remove from favorites
    state.favorites.deleteFavorite(movieID);

    // Toggle hear icon back to outline
    favoriteView.toggleFavorite(false);

    // Remove from the favorite list
    favoriteView.removeFavorite(movieID);
  }
  favoriteView.toggleMenu(state.favorites.checkIfFavorites());
};

// ------ WATCHED CONTROLLER ------
const watchedController = () => {
  // If there is no watched state, create it
  if (!state.watcheds) state.watcheds = new Watcheds();

  // Save ID of current movie
  const movieID = state.movie.id;

  // If movie isn't watched already, add to watched
  if (!state.watcheds.checkWatched(movieID)) {
    // Add to watched
    const newWatched = state.watcheds.addWatched(
      movieID,
      state.movie.img,
      state.movie.title
    );

    // Toggle Button checked
    watchedView.toggleWatched(true);

    // Render new watched on the list
    watchedView.renderWatched(newWatched);
  }
  // If it is, remove from watched list
  else {
    // Remove from watched
    state.watcheds.deleteWatched(movieID);

    // Toggle hear icon back to outline
    watchedView.toggleWatched(false);

    // Remove from the favorite list
    watchedView.removeWatched(movieID);
  }
  watchedView.toggleMenu(state.watcheds.checkIfWatched());
};

// ------ EVENT LISTENERS ------

// On page load
window.addEventListener('load', () => {
  // Render Home
  renderHome();

  // Create favorite and watcheds objects on page load
  state.favorites = new Favorites();
  state.watcheds = new Watcheds();

  // Read data from the local storage
  state.favorites.readLocal();
  state.watcheds.readLocal();

  // Toggle menu bar if there are favorites or viewed
  favoriteView.toggleMenu(state.favorites.checkIfFavorites());
  watchedView.toggleMenu(state.watcheds.checkIfWatched());

  // Render data to the menus
  state.favorites.favorites.forEach(favorite =>
    favoriteView.renderFavorite(favorite)
  );
  state.watcheds.watcheds.forEach(watched =>
    watchedView.renderWatched(watched)
  );
});

// Event listener on the form submit for search
elements.Form.addEventListener('submit', e => {
  e.preventDefault();
  searchController('new');
});

// Event listeners on the container that are placed by js
elements.mainContainer.addEventListener('click', e => {
  const button = e.target.closest('.button__pagination');
  const movie = e.target.closest('.movie');
  const back = e.target.matches('.details__go-back');
  const like = e.target.matches(
    '.details__actions-favorite, .details__actions-favorite *'
  );
  const watched = e.target.matches(
    '.details__actions-later, .details__actions-later *'
  );
  // If pagination button is clicked
  if (button) {
    const page = parseInt(button.dataset.page, 10);
    searchController('used', page);
  }
  // If movie item is clicked
  if (movie) {
    const movieID = movie.dataset.id;
    // Call movie controller
    movieController(movieID);
  }
  // Is back button is clicked
  if (back) {
    // Call the search controller and pass in the current page on the state
    searchController('used', state.search.page);
  }
  // If like button is clicked
  if (like) {
    favoriteController();
  }
  // If watched button is clicked
  if (watched) {
    watchedController();
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

// Event listener on the favorites menu
elements.favoritesMenu.addEventListener('click', e => {
  const panel = e.target.closest('.movie__item__panel');
  if (panel) {
    const movieID = panel.dataset.id;
    // Call movie controller
    movieController(movieID, true);
  }
});

// Event listener on the watched menu
elements.watchedMenu.addEventListener('click', e => {
  const panel = e.target.closest('.movie__item__panel');
  if (panel) {
    const movieID = panel.dataset.id;
    // Call movie controller
    movieController(movieID, true);
  }
});
