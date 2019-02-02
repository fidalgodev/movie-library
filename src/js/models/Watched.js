// Watched movies class model
export default class Watcheds {
  constructor() {
    this.watcheds = [];
  }

  // Method to add a watched object to our array of watcheds
  addWatched(id, img, title) {
    const watched = {
      id,
      img,
      title,
    };

    // Push to the object
    this.watcheds.push(watched);

    // Update local storage
    this.savetoLocal();

    return watched;
  }

  // Delete watched object from array
  deleteWatched(id) {
    const index = this.watcheds.findIndex(element => element.id === id);

    // Remove from object
    this.watcheds.splice(index, 1);

    // Update local storage
    this.savetoLocal();
  }

  // Check if passed id is on watcheds array
  checkWatched(id) {
    return this.watcheds.findIndex(el => el.id === id) !== -1;
  }

  // Check how many watcheds exist
  checkIfWatched() {
    return this.watcheds.length;
  }

  // Save to local storage
  savetoLocal() {
    localStorage.setItem('watchedsmovielibrary', JSON.stringify(this.watcheds));
  }

  // Read data from local storage
  readLocal() {
    // Get data from the local storage
    const watcheds = JSON.parse(localStorage.getItem('watchedsmovielibrary'));

    // If local storage has data, save to the object
    if (watcheds) this.watcheds = watcheds;
  }
}
