import { elements } from './base';

// Render single movie function
export const renderMovie = (movie, isFavorite, isWatched, fromMenu) => {
  if (movie) {
    let markup;
    if (movie.img === 'N/A') {
      markup = `
      <div class="container__single">
          <div class="container__single__details animated fadeIn faster container__single__noimg">
            <h1 class="container__single__details-name">${movie.title}</h1>
            <div class="container__single__details-details">
              <div class="details-year" title="Release Date">
                <i class="icon ion-ios-calendar"></i>${
                  movie.release === 'N/A' || !movie.release
                    ? 'Unavaiable'
                    : movie.release
                }
              </div>
              <div class="details-director" title="Movie Director">
                <i class="icon ion-ios-person"></i>${
                  movie.director === 'N/A' || !movie.director
                    ? 'Unavaiable'
                    : movie.director
                }
              </div>
              <div class="details-time" title="Total time">
                <i class="icon ion-ios-time"></i>${
                  movie.time === 'N/A' || !movie.time
                    ? 'Unavaiable'
                    : movie.time
                }
              </div>
              <div class="details-rating" title="Internet Movie Database Value">
                <i class="icon ion-ios-star"></i>${
                  movie.rating === 'N/A' || !movie.rating
                    ? 'Unavaiable'
                    : movie.rating
                }
              </div>
            </div>
            <div class="container__single__details-plot">${
              movie.plot === 'N/A' || !movie.plot ? 'Unavailable' : movie.plot
            }</div>
            <div class="container__single__buttons">
              <a href="https://www.imdb.com/title/${
                movie.imdbID
              }" target="_blank "title="${
        movie.imdbRating === 'N/A' || !movie.imdbRating
          ? movie.title
          : `${movie.imdbRating} based on ${movie.imdbVotes} votes`
      }"
          class="button details__imdb">
                IMDB ${
                  movie.imdbRating === 'N/A' || !movie.imdbRating
                    ? ''
                    : `<span class='imdb__score'>${movie.imdbRating}</span >`
                }
              </a>
              <button class="button details__actions-later">
                <i class="icon icon__watched ${
                  isWatched ? 'ion-ios-checkmark-circle' : 'ion-ios-checkmark'
                }"></i>
              </button>
              <button class="button details__actions-favorite">
                <i class="icon icon__favorite ${
                  isFavorite ? 'ion-ios-heart' : 'ion-ios-heart-empty'
                }"></i>
              </button>
              </button>
            </div>
            ${
              fromMenu === true
                ? ''
                : `<button class="button details__go-back">
          <i class="icon ion-ios-arrow-round-back"></i> BACK
            </button>`
            }
          </div>
        </div>
      `;
    } else {
      markup = `
        <div class="container__single">
          <div class="container__single__img animated fadeIn faster">
          <img
            class="img__single"
            src="${movie.img}"
            alt="${movie.title}"
          />
          </div>
          <div class="container__single__details animated fadeIn faster">
            <h1 class="container__single__details-name">${movie.title}</h1>
            <div class="container__single__details-details">
              <div class="details-year" title="Release Date">
                <i class="icon ion-ios-calendar"></i>${
                  movie.release === 'N/A' || !movie.release
                    ? 'Unavaiable'
                    : movie.release
                }
              </div>
              <div class="details-director" title="Movie Director">
                <i class="icon ion-ios-person"></i>${
                  movie.director === 'N/A' || !movie.director
                    ? 'Unavaiable'
                    : movie.director
                }
              </div>
              <div class="details-time" title="Total time">
                <i class="icon ion-ios-time"></i>${
                  movie.time === 'N/A' || !movie.time
                    ? 'Unavaiable'
                    : movie.time
                }
              </div>
              <div class="details-rating" title="Internet Movie Database Value">
                <i class="icon ion-ios-star"></i>${
                  movie.rating === 'N/A' || !movie.rating
                    ? 'Unavaiable'
                    : movie.rating
                }
              </div>
            </div>
            <div class="container__single__details-plot">${
              movie.plot === 'N/A' || !movie.plot ? 'Unavailable' : movie.plot
            }</div>
            <div class="container__single__buttons">
              <a href="https://www.imdb.com/title/${
                movie.imdbID
              }" target="_blank "title="${
        movie.imdbRating === 'N/A' || !movie.imdbRating
          ? movie.title
          : `${movie.imdbRating} based on ${movie.imdbVotes} votes`
      }"
          class="button details__imdb">
                IMDB ${
                  movie.imdbRating === 'N/A' || !movie.imdbRating
                    ? ''
                    : `<span class='imdb__score'>${movie.imdbRating}</span >`
                }
              </a>
              <button class="button details__actions-later">
                <i class="icon icon__watched ${
                  isWatched ? 'ion-ios-checkmark-circle' : 'ion-ios-checkmark'
                }"></i>
              </button>
              <button class="button details__actions-favorite">
                <i class="icon icon__favorite ${
                  isFavorite ? 'ion-ios-heart' : 'ion-ios-heart-empty'
                }"></i>
              </button>
            </div>
            ${
              fromMenu === true
                ? ''
                : `<button class="button details__go-back">
          <i class="icon ion-ios-arrow-round-back"></i> BACK
            </button>`
            }
          </div>
        </div>
    `;
    }
    elements.mainContainer.classList.remove('to-top');
    elements.mainContainer.insertAdjacentHTML('afterbegin', markup);
  }
};
