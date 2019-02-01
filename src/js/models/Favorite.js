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
    this.favorites.push(favorite);
  }

  // Delete favorite object from array
  deleteFavorite(id) {
    const index = this.favorites.forEach(element => element.id === id);
    this.favorites.splice(index, 1);
  }

  // Check if passed id is on favorite array
  checkFavorite(id) {
    return this.favorites.findIndex(el => el.id === id) !== -1;
  }

  // Check how many favorites exist
  checkIfFavorites() {
    return this.favorites.length;
  }
}
