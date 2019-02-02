import { elements } from './base';

// Toggle the favorite icon
export const toggleFavorite = isFavorite => {
  const button = document.querySelector('.icon__favorite');
  if (isFavorite) {
    button.classList.remove('ion-ios-heart-empty', 'ion-ios-heart');
    button.classList.add('ion-ios-heart');
  } else if (!isFavorite) {
    button.classList.remove('ion-ios-heart-empty', 'ion-ios-heart');
    button.classList.add('ion-ios-heart-empty');
  }
};

// Render favorite on the menu
export const renderFavorite = favorite => {
  if (favorite) {
    const markup = `
    <div class="movie__item__panel movie__item__favorite" data-id="${
      favorite.id
    }">
      <div class="movie__item__panel__div">
        <img
          src="${favorite.img}"
          class="movie__item__panel__img"
        />
        <h1 class="movie__item__panel__title">${favorite.title}</h1>
      </div>
    </div>
    `;
    elements.favoritesPanel.insertAdjacentHTML('afterbegin', markup);
  }
};

// Remove favorite from the menu
export const removeFavorite = id => {
  if (id) {
    const favorite = document.querySelector(
      `.movie__item__favorite[data-id='${id}']`
    );
    if (favorite) {
      favorite.parentElement.removeChild(favorite);
    }
  }
};

// Toggle menu if there are favorites
export const toggleMenu = favorites => {
  elements.favoritesMenu.style.visibility =
    favorites > 0 ? 'visible' : 'hidden';
  elements.favoritesMenu.style.opacity = favorites > 0 ? '1' : '0';
};
