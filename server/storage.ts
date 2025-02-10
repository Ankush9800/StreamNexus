import { users, type User, type InsertUser, movies, type Movie, type InsertMovie } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const MemoryStore = createMemoryStore(session);
const scryptAsync = promisify(scrypt);

// Helper function to hash password
async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getAdminUser(): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private movies: Map<number, Movie>;
  currentId: number;
  currentMovieId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.movies = new Map();
    this.currentId = 1;
    this.currentMovieId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });

    // Create initial admin user
    this.initializeAdminUser();
    // Add demo movies
    this.initializeDemoMovies();
  }

  private async initializeAdminUser() {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Create admin user if it doesn't exist
    const hashedPassword = await hashPassword(adminPassword);
    const adminUser: User = {
      id: 1,
      username: 'admin',
      password: hashedPassword,
      isAdmin: true
    };
    this.users.set(adminUser.id, adminUser);
    console.log('Admin user initialized with default password');
  }

  private initializeDemoMovies() {
    const demoMovies: Omit<Movie, "id" | "downloadCount">[] = [
      {
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
        downloadUrl: "https://example.com/movies/dark-knight",
        downloadUrl480p: "https://example.com/movies/dark-knight/480p",
        downloadUrl720p: "https://example.com/movies/dark-knight/720p",
        downloadUrl1080p: "https://example.com/movies/dark-knight/1080p",
        downloadUrl2160p: null,
        category: "Action",
        language: "English",
        releaseYear: "2008",
        rating: "9.0/10",
      },
      {
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
        downloadUrl: "https://example.com/movies/inception",
        downloadUrl480p: "https://example.com/movies/inception/480p",
        downloadUrl720p: "https://example.com/movies/inception/720p",
        downloadUrl1080p: "https://example.com/movies/inception/1080p",
        downloadUrl2160p: "https://example.com/movies/inception/2160p",
        category: "Thriller",
        language: "English",
        releaseYear: "2010",
        rating: "8.8/10",
      },
      {
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        downloadUrl: "https://example.com/movies/shawshank-redemption",
        downloadUrl480p: "https://example.com/movies/shawshank/480p",
        downloadUrl720p: "https://example.com/movies/shawshank/720p",
        downloadUrl1080p: "https://example.com/movies/shawshank/1080p",
        downloadUrl2160p: null,
        category: "Drama",
        language: "English",
        releaseYear: "1994",
        rating: "9.3/10",
      },
    ];

    demoMovies.forEach((movie) => {
      const newMovie: Movie = {
        ...movie,
        id: this.currentMovieId++,
        downloadCount: 0,
      };
      this.movies.set(newMovie.id, newMovie);
    });

    // Store movies in localStorage through the movies interface
    const moviesArray = Array.from(this.movies.values());
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('movies', JSON.stringify(moviesArray));
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getAdminUser(): Promise<User | undefined> {
    return this.users.get(1); // Admin user always has ID 1
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.currentId++;
    const newUser: User = { 
      ...user, 
      id,
      isAdmin: false // Regular users can't be admins
    };
    this.users.set(id, newUser);
    return newUser;
  }
}

export const storage = new MemStorage();