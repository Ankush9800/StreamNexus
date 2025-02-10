import type { Movie } from "@shared/schema";

const STORAGE_KEY = "movies";

export function getMovies(): Movie[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
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
