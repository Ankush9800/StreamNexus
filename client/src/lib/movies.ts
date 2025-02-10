import type { Movie } from "@shared/schema";

const STORAGE_KEY = "movies";

const DEMO_MOVIES: Omit<Movie, "id" | "downloadCount">[] = [
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    downloadUrl: "https://example.com/movies/dark-knight",
    category: "Action",
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    downloadUrl: "https://example.com/movies/inception",
    category: "Sci-Fi",
  },
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    downloadUrl: "https://example.com/movies/shawshank-redemption",
    category: "Drama",
  },
];

export function getMovies(): Movie[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initialize with demo movies if storage is empty
    const demoMovies = DEMO_MOVIES.map((movie, index) => ({
      ...movie,
      id: index + 1,
      downloadCount: 0,
    }));
    saveMovies(demoMovies);
    return demoMovies;
  }

  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error parsing movies:', e);
    return [];
  }
}

export function saveMovies(movies: Movie[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

export function addMovie(movie: Omit<Movie, "id" | "downloadCount">): Movie {
  const movies = getMovies();
  const newMovie = {
    ...movie,
    id: Date.now(),
    downloadCount: 0,
  };
  movies.push(newMovie);
  saveMovies(movies);
  return newMovie;
}

export function updateMovie(id: number, movie: Partial<Movie>) {
  const movies = getMovies();
  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) return null;

  movies[index] = { ...movies[index], ...movie };
  saveMovies(movies);
  return movies[index];
}

export function deleteMovie(id: number) {
  const movies = getMovies();
  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) return false;

  movies.splice(index, 1);
  saveMovies(movies);
  return true;
}

export function incrementDownload(id: number) {
  const movies = getMovies();
  const movie = movies.find((m) => m.id === id);
  if (!movie) return;

  movie.downloadCount++;
  saveMovies(movies);
}