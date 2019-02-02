// Favorite movies class model
export default class Favorites {
  constructor() {
    this.favorites = [];
  }

  // Method to add a favorite object to our array of favorites
  addFavorite(id, img, title) {
    const favorite = {
      id,
      img,
      title,
    };
    // Push to the object
    this.favorites.push(favorite);

    // Update local storage
    this.savetoLocal();

    return favorite;
  }

  // Delete favorite object from array
  deleteFavorite(id) {
    const index = this.favorites.findIndex(element => element.id === id);

    // Remove from object
    this.favorites.splice(index, 1);

    // Update local storage
    this.savetoLocal();
  }

  // Check if passed id is on favorite array
  checkFavorite(id) {
    return this.favorites.findIndex(el => el.id === id) !== -1;
  }

  // Check how many favorites exist
  checkIfFavorites() {
    return this.favorites.length;
  }

  // Save to local storage
  savetoLocal() {
    localStorage.setItem(
      'favoritesmovielibrary',
      JSON.stringify(this.favorites)
    );
  }

  // Read data from local storage
  readLocal() {
    // Get data from the local storage
    const favorites = JSON.parse(localStorage.getItem('favoritesmovielibrary'));

    // If local storage has data, save to the object
    if (favorites) this.favorites = favorites;
  }
}
