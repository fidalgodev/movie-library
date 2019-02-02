import { elements } from './base';

// Toggle the watched icon
export const toggleWatched = isWatched => {
  const button = document.querySelector('.icon__watched');
  if (isWatched) {
    button.classList.remove('ion-ios-checkmark', 'ion-ios-checkmark-circle');
    button.classList.add('ion-ios-checkmark-circle');
  } else if (!isWatched) {
    button.classList.remove('ion-ios-checkmark', 'ion-ios-checkmark-circle');
    button.classList.add('ion-ios-checkmark');
  }
};

// Render watched on the menu
export const renderWatched = watched => {
  if (watched) {
    const markup = `
    <div class="movie__item__panel movie__item__watched" data-id="${
      watched.id
    }">
      <div class="movie__item__panel__div">
        <img
          src="${watched.img}"
          class="movie__item__panel__img"
        />
        <h1 class="movie__item__panel__title">${watched.title}</h1>
      </div>
    </div>
    `;
    elements.watchedMenuPanel.insertAdjacentHTML('afterbegin', markup);
  }
};

// Remove watched from the menu
export const removeWatched = id => {
  if (id) {
    const watched = document.querySelector(
      `.movie__item__watched[data-id='${id}']`
    );
    if (watched) {
      watched.parentElement.removeChild(watched);
    }
  }
};

// Toggle menu if there are watched
export const toggleMenu = watcheds => {
  elements.watchedMenu.style.visibility = watcheds > 0 ? 'visible' : 'hidden';
  elements.watchedMenu.style.opacity = watcheds > 0 ? '1' : '0';
};
