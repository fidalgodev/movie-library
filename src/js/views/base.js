// Exporting DOM Elements
export const elements = {
  Form: document.querySelector('.search'),
  inputForm: document.querySelector('.search__input'),
  mainContainer: document.querySelector('.container'),
  logo: document.querySelector('.logo'),
};

// Render the loader
export const renderLoader = () => {
  const markup = `
  <div class="loader">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
  `;
  elements.mainContainer.insertAdjacentHTML('afterbegin', markup);
};

// Clear the loader
export const clearLoader = () => {
  elements.mainContainer.innerHTML = '';
};

// Home
export const renderHome = () => {
  const markup = `
  <div class="container__home">
    <div class="container__home-left">
      <img src="./img/undraw_movie_night_93wl.svg" alt="Movie Library" />
    </div>
    <div class="container__home-right">
      <h1 class="container__home-title">Movie Library</h1>
      <p class="container__home-text">
        ⌨️ Write the name of the movie on the search bar
      </p>
      <p class="container__home-text">➡️ Press enter or the search icon</p>
      <p class="container__home-text">🔥 Enjoy</p>
    </div>
  </div>
  `;
  elements.mainContainer.classList.remove('to-top');
  elements.mainContainer.insertAdjacentHTML('afterbegin', markup);
};
