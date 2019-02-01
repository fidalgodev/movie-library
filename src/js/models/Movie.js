import axios from 'axios';

// Movie class model
export default class Movie {
  constructor(id) {
    this.id = id;
  }

  // Get movie
  async getMovie() {
    const apiKey = process.env.API_KEY;
    const proxy = process.env.PROXY;
    try {
      const res = await axios.get(
        `${proxy}http://www.omdbapi.com/?apikey=${apiKey}&i=${
          this.id
        }&type=movie&plot=full`
      );
      this.title = res.data.Title;
      this.img = res.data.Poster;
      this.plot = res.data.Plot;
      this.release = res.data.Released;
      this.director = res.data.Director;
      this.time = res.data.Runtime;
      this.rating = res.data.Ratings[0].Value;
      this.imdbID = res.data.imdbID;
      this.imdbRating = res.data.imdbRating;
      this.imdbVotes = res.data.imdbVotes;
    } catch (error) {
      console.log(error);
    }
  }
}
