import { elements } from './base';

export const renderMovie = movie => {
  if (movie) {
    const markup = `
      <div class="container__single">
        <div class="container__single__img">
          <img
            class="img__single"
            src="${movie.img}"
            alt=""
          />
        </div>
        <div class="container__single__details">
          <h1 class="container__single__details-name">${movie.title}</h1>
          <div class="container__single__details-details">
            <div class="details-year" title="Release Date">
              <i class="icon ion-ios-calendar"></i>${movie.release}
            </div>
            <div class="details-director" title="Movie Director">
              <i class="icon ion-ios-person"></i>${movie.director}
            </div>
            <div class="details-time" title="Total time">
              <i class="icon ion-ios-time"></i>${movie.time}
            </div>
            <div class="details-rating" title="Internet Movie Database Value">
              <i class="icon ion-ios-star"></i>${movie.rating}
            </div>
          </div>
          <div class="container__single__details-plot">${movie.plot}</div>
          <div class="container__single__buttons">
            <a href="https://www.imdb.com/title/${
              movie.imdbID
            }" target="_blank "title="${movie.imdbRating} based on ${
      movie.imdbVotes
    } votes" class="button details__imdb">
              IMDB <span class="imdb__score">${movie.imdbRating}</span>
            </a>
            <button class="button details__actions-later">
              <i class="icon ion-ios-checkmark-circle-outline"></i>
            </button>
            <button class="button details__actions-favorite">
              <i class="icon ion-ios-heart-empty"></i>
            </button>
          </div>
          <button class="button details__go-back">
            <i class="icon ion-ios-arrow-round-back"></i>BACK
          </button>
        </div>
      </div>
    `;
    elements.mainContainer.classList.remove('to-top');
    elements.mainContainer.insertAdjacentHTML('afterbegin', markup);
  }
};
