// Exporting DOM Elements
export const elements = {
  Form: document.querySelector('.search'),
  inputForm: document.querySelector('.search__input'),
  mainContainer: document.querySelector('.container'),
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
